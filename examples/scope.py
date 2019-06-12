x = 12
def f ():
	global x
	print (x)
	x = 'asdf'
f()
print (x) #asdf


def f ():
	print (x)
	x = 'asdf'
f () # Error
