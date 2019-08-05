# colab-gsoc2019-Srinivasan_Vijayraghavan

## Usage
~~~bash
python3 main.py <inputfile> --outfile=<outputfile>
js <outfile>
~~~
If \<outputfile\> is not mentioned, the output file name defaults to \_\_gen\_\_.js
### Compatible versions
- python3 : 3.6.7
- node    : 8.10.0

## Example
### Hello World

The simplest example is to run a hello world program. Open up a python3 file and save it as *helloWorld.py*.
Copy the following line of code into *helloWorld.py*.
~~~python
print ('Hello World!')
~~~

Next, run the following command to generate the javascript file.
~~~bash
python3 main.py helloWorld.py --outfile=out.js
~~~
This generates the file *out.js* which contains the generated code.
*out.js* can be executed in the command line in the following manner
~~~bash
js out.js
~~~
Alternatively, it can be included in a webpage.

### Interaction with WebSim
To program your bot in websim using python3, you can use this tool. The file 'modules/Hal.py' contains the API that is supported.

~~~python
import HAL

HAL.setV (12)
HAL.setW (10)
print ('US = ' + str (HAL.getUS ()))
print ('IR = ' + str (HAL.getIR ()))

print (HAL.getLaser ())
print (HAL.getEncoders ())
~~~
