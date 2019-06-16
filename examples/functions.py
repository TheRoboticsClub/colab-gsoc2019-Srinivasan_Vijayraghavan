def func (x, y):
	return x + y

print (func (1, 2)) # 3
print (func ([1, 2], [3, 4])) # [1, 2, 3, 4]

def func (): pass

print (func ()) # None

def func (x, y):
	return x + [3, 4] + y

print (func ([1, 2], [5, 6]))
print (func (1, 3)) # Throw TypeError
