# colab-gsoc2019-Srinivasan_Vijayraghavan

## Usage
~~~bash
python3 main.py <inputfile> <outputfile>
js <outfile>
~~~
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
python3 main.py helloWorld.py out.js
~~~
This generates the file *out.js* which contains the generated code.
*out.js* can be executed in the command line in the following manner
~~~bash
js out.js
~~~
Alternatively, it can be included in a webpage.
