import shutil
import glob

if __name__ == '__main__':
	order = ['runtime/setup.js', 'runtime/__PyObject__.js', 'runtime/__PyStr__.js',
	'runtime/__PyNone__.js', 'runtime/exceptions.js', 'runtime/__PyFunction__.js',
	'runtime/__PySlice__.js', 'runtime/utils.js', 'runtime/__PyFloat__.js',
	'runtime/__PyDict__.js', 'runtime/__PyTuple__.js', 'runtime/__PyInt__.js',
	'runtime/__PyRange__.js', 'runtime/__PyBool__.js', 'runtime/__PyModule__.js',
	'runtime/__PyList__.js', 'runtime/builtin.js']
	with open('runtime.js', 'wb') as outfile:
		for filename in order:
			with open(filename, 'rb') as readfile:
				shutil.copyfileobj(readfile, outfile)
