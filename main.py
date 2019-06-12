import ast
import sys
import io

class Visitor (ast.NodeVisitor):
	def __init__ (self, ostream):
		self.ostream = ostream
		self.aug = False
		self.in_exp = False
		self.global_vars = []
	# Literals
	def visit_Num (self, node):
		if (isinstance (node.n, int)):
			self.ostream.write (f'(__PyInt__.__call__ ({node.n}))')
		elif (isinstance (node.n, float)):
			self.ostream.write (f'(__PyFloat__.__call__ ({node.n}))')
		elif (isinstace (node.n, complex)):
			pass

	def visit_Str (self, node):
		self.ostream.write (f'(__PyStr__.__call__ (\'{node.s}\'))')

	def visit_NameConstant (self, node):
		if (node.value == True or node.value == False):
			self.ostream.write (f'{node.value}')
		elif (node.value == None):
			self.ostream.write ('None')

	def visit_List (self, node):
		elts, ctx = node.elts, node.ctx
		self.ostream.write ('__PyList__.__call__ ([')
		for elt in elts:
			self.visit (elt)
			self.ostream.write (', ')
		self.ostream.write ('])')
	# Exprs

	def visit_UnaryOp (self, node):
		op, operand = node.op, node.operand
		self.visit (op)
		self.ostream.write (' (')
		self.visit (operand)
		self.ostream.write (')')

	def visit_UAdd (self, node):
		self.ostream.write ('__uadd__')
	def visit_USub (self, node):
		self.ostream.write ('__usub__')

	def visit_BinOp (self, node):
		left, op, right = node.left, node.op, node.right
		self.ostream.write ('(')
		self.visit (op)
		self.ostream.write ('(')
		self.visit (left)
		self.ostream.write (',')
		self.visit (right)
		self.ostream.write (')')
		self.ostream.write (')')


	def visit_Add (self, node):
		self.ostream.write (f'__{"i" if self.aug else ""}add__')

	def visit_Sub (self, node):
		self.ostream.write (f'__{"i" if self.aug else ""}sub__')

	def visit_Mult (self, node):
		self.ostream.write (f'__{"i" if self.aug else ""}mult__')

	def visit_Div (self, node):
		self.ostream.write (f'__{"i" if self.aug else ""}div__')

	def visit_Name (self, node):
		id = node.id
		self.ostream.write (f'__loadvar__ ({id})')

	def visit_Call (self, node):
		func, args = node.func, node.args
		self.visit (func)
		self.ostream.write ('.__call__')
		self.ostream.write (' (')

		prev_in_exp = self.in_exp
		self.in_exp = True
		for arg in args:
			self.visit (arg)
			self.ostream.write (', ')
		self.in_exp = prev_in_exp

		self.ostream.write (')')
		if (not self.in_exp):
			self.write_endline ()

	def visit_Compare (self, node):
		self.in_exp = True;
		left, ops, comparators = node.left, node.ops, node.comparators
		self.ostream.write ('(')
		for op in ops:
			self.visit (op)
			self.ostream.write ('(')
			self.visit (left)
			self.ostream.write (', ')
			self.visit (comparators[0])
			left = comparators[0]
			comparators = comparators[1:]
			self.ostream.write (')')
		self.ostream.write (')')
		self.in_exp = False;

	def visit_Assign (self, node):
		targets, value = node.targets, node.value
		for target in targets:
			if (isinstance (target, ast.Tuple)):
				for n, v in zip (target.elts, value.elts):
					self.visit (ast.Assign (targets=[n], value = v))
			else:
				if (not isinstance (target, ast.Subscript)):
					if (target.id not in self.global_vars):
						self.ostream.write ('var ')
					self.ostream.write (target.id)
					self.ostream.write (' = ')
					self.visit (value)
				else:
					self.ostream.write (target.id)
					self.visit (value)
					self.ostream.write (')')
				self.write_endline ()


	def visit_AugAssign (self, node):
		target, op, value = node.target, node.op, node.value
		self.ostream.write ('var')
		self.ostream.write (f' {target.id}= ')
		self.visit (target)
		self.ostream.write ('.')
		self.aug = True
		self.visit (op)
		self.aug = False
		self.ostream.write (' (')
		self.visit (value)
		self.ostream.write (')')
		self.write_endline()

	def visit_BoolOp (self, node):
		op, values = node.op, node.values
		self.visit (op)
		self.ostream.write ('(')
		for value in values:
			self.visit (value)
			self.ostream.write (', ')
		self.ostream.write (')')

	def visit_Eq (self, _):
		self.ostream.write ('__eq__')
	def visit_NotEq (self, _):
		self.ostream.write ('__neq__')
	def visit_Lt (self, _):
		self.ostream.write ('__lt__')
	def visit_LtE (self, _):
		self.ostream.write ('__le__')
	def visit_Gt (self, _):
		self.ostream.write ('__gt__')
	def visit_GtE (self, _):
		self.ostream.write ('__ge__')
	def visit_Is (self, _):
		self.ostream.write ('__is__')
	def visit_IsNot (self, _):
		self.ostream.write ('__isnot__')

	def visit_And (self, _):
		self.ostream.write ('__and__')

	def visit_Or (self, _):
		self.ostream.write ('__or__')

	def visit_Subscript (self, node):
		value, slice, ctx = node.value, node.slice, node.ctx
		if (isinstance (ctx, ast.Store)):
			self.visit (value)
			self.ostream.write ('.__setitem__ (')
			self.visit (node.slice)
			self.ostream.write (', ')
		elif (isinstance (ctx, ast.Load)):
			self.visit (value)
			self.ostream.write ('.__getitem__ (')
			self.visit (node.slice)
			self.ostream.write (')')

	# Control Flow

	def visit_If (self, node):
		test, body, orelse = node.test, node.body, node.orelse
		self.ostream.write ('if ( (')

		self.in_exp = True
		self.visit (test)
		self.in_exp = False

		self.ostream.write (').__bool__ () === True) {\n')
		for stmt in body:
			self.visit (stmt)
		self.ostream.write ('}\n')
		for elseif in orelse[:-1]:
			self.ostream.write ('else ')
			self.visit (elseif)
		if (len (orelse) > 0):
			self.ostream.write ('else {\n')
			self.visit (orelse[-1])
			self.ostream.write ('}\n')

	def visit_While (self, node):
		test, body = node.test, node.body
		self.ostream.write ('while ( (')

		self.in_exp = True
		self.visit (test)
		self.in_exp = False

		self.ostream.write (').__bool__ () === True) {')

		for stmt in body:
			self.visit (stmt)

		self.ostream.write ('};\n')

	def visit_For (self, node):
		target, iter, body = node.target, node.iter, node.body
		if (not isinstance (target, ast.Name)):
			exit ('Complex for loops are not supported')

		self.ostream.write (f'for (let {target.id} of ')

		self.in_exp = True
		self.visit (iter)
		self.in_exp = False

		self.ostream.write ('.__iter__()) {\n')
		# self.ostream.write ('{\n')
		for stmt in body:
			self.visit (stmt)

		self.ostream.write ('}\n')


	# FunctionDef
	def visit_FunctionDef (self, node):
		name, args, body = node.name, node.args, node.body
		self.ostream.write (f'var {name}')
		self.ostream.write (' = new __PyFunction__ (function (')
		self.visit (args)
		self.ostream.write (') {\n')

		prev = self.global_vars.copy()

		for stmt in body:
			self.visit (stmt)
		self.ostream.write ('return None;\n')
		self.ostream.write ('});\n')

		self.global_vars = prev

	def visit_arguments (self, node):
		for arg in node.args:
			self.visit (arg)
			self.ostream.write (', ')
	def visit_arg (self, node):
		arg = node.arg
		self.ostream.write (arg)

	def visit_Global (self, node):
		for name in node.names:
			self.global_vars.append (name)

	def visit_Return (self, node):
		value = node.value
		prev = self.in_exp
		self.in_exp = True
		self.ostream.write ('return ')
		self.visit (value)
		self.in_exp = prev
		self.write_endline ()

	def visit_Pass (self, node):
		pass

	def write_endline (self):
		self.ostream.write (';\n')

if __name__ == '__main__':
	if (len (sys.argv) != 2):
		print ('''Usage:
		python3 main.py <filename>
		''')
		exit ()
	try:
		f = open (sys.argv[1], 'r')
	except Exception as e:
		print (f'\'{sys.argv[1]}\': No such file')
		exit ()
	pt = ast.parse (f.read ());
	f = io.StringIO();
	Visitor (f).visit (pt);

	fp = open ('__gen__.js', 'w')
	try:
		fr = open ('runtime.js', 'r')
	except Exception as e:
		print ('''usage:
		python3 build_runtime.py
		python3 main.py <file>
		''')
		exit ()
	fp.write (fr.read())
	fp.write ('\n//Translated code below\n')
	fp.write (f.getvalue())

	print (f.getvalue ());
