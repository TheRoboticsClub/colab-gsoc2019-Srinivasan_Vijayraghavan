for x in range (10):
	for y in range (10):
		for z in range (-5, 5):
			if (z > 0 and (x + y) % z == 0):
				print (x + y)
