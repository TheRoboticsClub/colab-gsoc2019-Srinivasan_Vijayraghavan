import shutil
import glob

if __name__ == '__main__':
	files = ['runtime/__PyStr__.js', 'runtime/__PyNone__.js', 'runtime/__PyFunction__.js', 'runtime/utils.js', 'runtime/__PyFloat__.js', 'runtime/__PyTuple__.js', 'runtime/__PyInt__.js', 'runtime/__PyRange__.js', 'runtime/__PyBool__.js', 'runtime/builtin.js', 'runtime/__PyList__.js']
	with open('runtime.js', 'wb') as outfile:
		for filename in files:
			with open(filename, 'rb') as readfile:
				shutil.copyfileobj(readfile, outfile)
