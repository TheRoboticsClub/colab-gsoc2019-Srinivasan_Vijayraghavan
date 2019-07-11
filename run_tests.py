import unittest
import io, os
import ast
from main import Visitor
from test.support import run_unittest, check_syntax_error, check_warnings


runtime_txt = file_stream = None

class ExprTest (unittest.TestCase):

	def get_stream (self, exp):
		f = io.StringIO();
		pt = ast.parse (exp)
		Visitor (f).visit (pt)
		return f

	def get_transpiler_output (self, filename):
		os.system (f'python3 main.py {filename}')
		os.system ('js __gen__.js > __transpiled__.txt')
		output_stream = open ('__transpiled__.txt', 'r')
		output = output_stream.read ()
		output_stream.close ()
		return output

	def test_expr (self):
		output = self.get_transpiler_output ('tests/test_expr.py')
		expected = '''126.2
'''
		self.assertEqual (output, expected)

	def test_conditional (self):
		output = self.get_transpiler_output ('tests/test_conditional.py')
		expected = '''a = 1, b = 2, c = 3
'''
		self.assertEqual (output, expected)

	def test_global (self):
		output = self.get_transpiler_output ('tests/test_global.py')
		expected = '''22
[1, 2, 3, 6]
'''
		self.assertEqual (output, expected)

	def test_list (self):
		output = self.get_transpiler_output ('tests/test_list.py')
		expected = '''[1, 2, 3]
[1, 2, 3, 4]
4
[2, 3]
[1, 2, 3, 4]
'''
		self.assertEqual (output, expected)

	def test_assignment (self):
		output = self.get_transpiler_output ('tests/test_assignment.py')
		expected = '''asdf
asdf
1
2
ValueError: not enough values to unpack
'''
		self.assertEqual (output, expected)

	def test_for (self):
		output = self.get_transpiler_output ('tests/test_for.py')
		expected = ''
		for x in range (10):
			for y in range (10):
				for z in range (-5, 5):
					if (z > 0 and (x + y) % z == 0):
						expected += str (x+y) + '\n'
		self.assertEqual (output, expected)

	def test_scope (self):
		output = self.get_transpiler_output ('tests/test_scope.py')
		expected = '''UnboundLocalError: name 'x' referenced before assginment
'''
		self.assertEqual (output, expected)

	def test_import (self):
		output = self.get_transpiler_output ('tests/test_import.py')
		expected = '''setting V=12
setting W=10
US = 12
IR = True
False
(1, 2)
'''
		self.assertEqual (output, expected)

if __name__ == '__main__':
	try:
		runtime_txt = open ('runtime.js', 'r').read ()
	except:
		os.system ('python3 build_runtime.py')
		runtime_txt = open ('runtime.js', 'r').read ()

	file_stream = open ('__test__.txt', 'w')
	unittest.main ()
