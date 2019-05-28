import ast
import sys
import io

class Visitor (ast.NodeVisitor):
	def __init__ (self, ostream):
		self.ostream = ostream

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
		self.ostream.write ('__add__')

	def visit_Sub (self, node):
		self.ostream.write ('__sub__')

	def visit_Mult (self, node):
		self.ostream.write ('__mult__')

	def visit_Div (self, node):
		self.ostream.write ('__div__')

if __name__ == '__main__':
	assert (len (sys.argv) == 2)
	f = open (sys.argv[1], 'r')
	pt = ast.parse (f.read ());
	f = io.StringIO();
	Visitor (f).visit (pt);
	print (f.getvalue ());
