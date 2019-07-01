# Default arguments
def f (x = 1, y = 1):
	return x + y

print (f (1))

# 'int' object is not callable
print (f (1) ())
