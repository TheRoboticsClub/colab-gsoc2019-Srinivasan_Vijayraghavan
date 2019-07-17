d = {}

def fib (n):
	if (n < 2): f = 1
	elif (n in d) : f = d[n]
	else :
		d[n] = fib (n-1) + fib (n-2)
		f = d[n]
	return f

print (fib (50))

for t in d.items ()[:10]:
	print (t)
