print ('hello')
s = 4
print (s)
def f(a):
	s = 9
	global s
	return s + a

print(f(5))
