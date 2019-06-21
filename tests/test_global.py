x = 2
l = [1,2,3]

def glob ():
	global x
	x = 10
	x += 12
	global l
	l += [6]

glob ()

print (x)
print (l)
