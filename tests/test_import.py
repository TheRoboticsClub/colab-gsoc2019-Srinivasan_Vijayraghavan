import HAL

HAL.setV (12)
HAL.setW (10)
print ('US = ' + str (HAL.getUS ()))
print ('IR = ' + str (HAL.getIR ()))

print (HAL.getLaser ())
print (HAL.getEncoders ())
