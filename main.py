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

	def visit_Assign (self, node):
		targets, value = node.targets, node.value
		for target in targets:
			self.ostream.write ('var ')
			self.visit (target)
			self.ostream.write (' = ')
			self.visit (value)
			self.write_endline ()
	def visit_AugAssign (self, node):
		target, op, value = node.target, node.op, node.value
		self.visit (target)
		self.ostream.write (' = ')
		self.visit (value)
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
	def write_endline (self):
		self.ostream.write (';\n')

if __name__ == '__main__':
	assert (len (sys.argv) == 2)
	f = open (sys.argv[1], 'r')
	pt = ast.parse (f.read ());
	f = io.StringIO();
	Visitor (f).visit (pt);

	fp = open ('__gen__.js', 'w')
	fr = open ('runtime.js', 'r')
	fp.write (fr.read())
	fp.write ('\n//Translated code below\n')
	fp.write (f.getvalue())

	print (f.getvalue ());
