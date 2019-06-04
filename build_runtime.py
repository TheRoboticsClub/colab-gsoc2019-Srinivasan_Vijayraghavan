import shutil
import glob

if __name__ == '__main__':
	with open('runtime.js', 'wb') as outfile:
		for filename in glob.glob('runtime/*.js'):
			with open(filename, 'rb') as readfile:
				shutil.copyfileobj(readfile, outfile)
