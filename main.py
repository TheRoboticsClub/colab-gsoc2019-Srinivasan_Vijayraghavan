import ast
import sys
import io

class Visitor (ast.NodeVisitor):
	def __init__ (self, ostream):
		self.ostream = ostream
		self.aug = False
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
			pass

	def visit_List (self, node):
		elts, ctx = node.elts, node.ctx
		self.ostream.write ('__PyList__.__call__ ([')
		for elt in elts:
			self.visit (elt)
			self.ostream.write (', ')
		self.ostream.write ('])')
	# Exprs
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
		self.ostream.write (id)

	def visit_Call (self, node):
		func, args = node.func, node.args
		self.visit (func)
		self.ostream.write ('.__call__')
		self.ostream.write (' (')
		for arg in args:
			self.visit (arg)
		self.ostream.write (')')
		self.write_endline ()

	def visit_Compare (self, node):
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
	def visit_Assign (self, node):
		targets, value = node.targets, node.value
		for target in targets:
			if (isinstance (target, ast.Tuple)):
				for n, v in zip (target.elts, value.elts):
					self.visit (ast.Assign (targets=[n], value = v))
			else:
				if (not isinstance (target, ast.Subscript)):
					self.ostream.write ('var ')
					self.visit (target)
					self.ostream.write (' = ')
					self.visit (value)
				else:
					self.visit (target)
					self.visit (value)
					self.ostream.write (')')
				self.write_endline ()

	def visit_Eq (self, _):
		self.ostream.write ('__eq__')

	def visit_AugAssign (self, node):
		target, op, value = node.target, node.op, node.value
		self.visit (target)
		self.ostream.write (' = ')
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
		self.visit (test)
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
	def write_endline (self):
		self.ostream.write (';\n')

if __name__ == '__main__':
	assert (len (sys.argv) == 2)
	f = open (sys.argv[1], 'r')
	pt = ast.parse (f.read ());
	f = io.StringIO();
	Visitor (f).visit (pt);

	fp = open ('__gen__.js', 'w')
	fr = open ('runtime/runtime.js', 'r')
	fp.write (fr.read())
	fp.write ('\n//Translated code below\n')
	fp.write (f.getvalue())

	print (f.getvalue ());
