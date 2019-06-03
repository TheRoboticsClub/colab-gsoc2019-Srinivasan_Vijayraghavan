import unittest
import io
import ast
from main import Visitor

def trim(st):
	return ' '.join(st.replace ('\n', ' ')
	.replace ('\t', ' ').replace(' ', '').split())

class ExprTest (unittest.TestCase):

	def get_stream (self, exp):
		f = io.StringIO();
		pt = ast.parse (exp)
		Visitor (f).visit (pt)
		return f

	def test_num_add (self):
		f = self.get_stream ('a = 1 + 1')
		self.assertEqual (
			trim (f.getvalue()),
			trim ('var a = (__add__((__PyInt__.__call__ (1)),(__PyInt__.__call__ (1))));')
		)

	def test_num_mul (self):
		f = self.get_stream ('1.*1')
		self.assertEqual (
			trim (f.getvalue()),
			trim ('''
			(__mult__(
				(__PyFloat__.__call__ (1.0)),
				(__PyInt__.__call__ (1))
			))
			''')
		)
	def test_str_add (self):
		f = self.get_stream ('\'asdf\' + \'jkl;\'')
		self.assertEqual (
			trim (f.getvalue ()),
			trim ('''
			(__add__(
				(__PyStr__.__call__ ('asdf')),
				(__PyStr__.__call__ ('jkl;'))
			))
			''')
		)
	def test_num_all (self):
		f = self.get_stream ('1.0 + 2.2 - 90 / (12.12 * 9)')
		self.assertEqual (
			trim (f.getvalue()),
			trim ('''
			(__sub__(
				(__add__(
					(__PyFloat__.__call__ (1.0)),
					(__PyFloat__.__call__ (2.2)))
				),
				(__div__(
					(__PyInt__.__call__ (90)),
					(__mult__(
						(__PyFloat__.__call__ (12.12)),
						(__PyInt__.__call__ (9)))
					))
				))
			)
			''')
		)

if __name__ == '__main__':
	unittest.main ()
