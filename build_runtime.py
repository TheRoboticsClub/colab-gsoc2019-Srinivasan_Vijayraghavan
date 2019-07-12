import shutil
import glob

if __name__ == '__main__':
	reserved = ['setup.js', 'runtime/__PyStr__.js', 'runtime/builtin.js', 'runtime/__PyObject__.js']

	with open('runtime.js', 'wb') as outfile:
		with open ('runtime/setup.js', 'rb') as readfile:
			shutil.copyfileobj (readfile, outfile)

		with open ('runtime/__PyObject__.js', 'rb') as readfile:
			shutil.copyfileobj (readfile, outfile)

		with open ('runtime/__PyStr__.js', 'rb') as readfile:
			shutil.copyfileobj (readfile, outfile)

		for filename in glob.glob('runtime/*.js'):
			if (filename not in reserved):
				with open(filename, 'rb') as readfile:
					shutil.copyfileobj(readfile, outfile)

		with open ('runtime/builtin.js', 'rb') as readfile:
			shutil.copyfileobj (readfile, outfile)
