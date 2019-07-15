# PyOnBrowser

| Contents                                         |
| ------------------------------------------------ |
| 1. [Introduction](#Introduction)                 |
| 2. [People Involved](#People_Involved)           |
| 3. [Development Status](#Development_Status)     |
| 4. [Weekly Documentation](#Weekly_Documentation) |

<a name = "Introduction"/>

## Introduction
WebSim is a web-based robot simulator. It is used as a tool for learning robot programming. WebSim is currently programmable through JavaScript. This project aims to support programming the simulator in python3 by building a transpiler that targets JavaScript.

<a name = "People_Involved"/>

## People Involved
- Gorka Guarduiola (paurea [at] gmail [dot] com) [GSoC Mentor]
- Luis Roberto Morales (lr [dot] morales [dot] iglesias [at] gmail [dot] com) [GSoC Mentor]
- Srinivasan Vijayraghavan (srinivasan [dot] vijayraghavan [at] iiitb [dot] org) [GSoC Student]

<a name = "Development_Status"/>

## Development Status

### Phase-1

| S.No | Construct               | Status |
| ---- | ----------------------- | ----- |
|  1   | Arithmetic expressions  | Done |
|  2   | Variable declarations   | Done |
|  3   | Conditional Statements  | Done |
|  4   | While and For loops     | Done |
|  5   | Functions               | Done |
|  6   | Test Suite              | In Progress |


<a name = "Weekly_Documentation"/>

## Weekly Documentation

### Week-7
#### Status/Delivarables
- [x] Minor enhancements, tweaks
- [x] Exception handling

Minor enhancements includes inheriting from the Object type. This is important since every object in python3 has methods such as \_\_gt\_\_, \_\_ge\_\_, \_\_lt\_\_, etc.
And when such operations are performed, appropriate action must be taken. In the implementation however, I had forgotten to inherit from the Object type and hence, it resulted in a few bugs.
Other enhancements includes adding the type of each class, etc.

Exception handling is actually a challenging construct, since if it has to be done properly, we need access to the callstack. We cannot use JS's builtin exceptions since the actual functions that are executed will be different in the generated JS code and will only confuse the programmer as to what is causing the exception in the first place.
The exception handling that is currently supported is very primitive, in that it does not indicate the line number as to where the exception was thrown, and does not indicate the traceback of calls of the exception.
I'm still discussing with my mentor as to how this might be handled (either with a fake callstack or something else).

### Week-6
#### Status/Deliverables
- [x] Import Statements

Handling import statements in python3 is similar to what we have in JS. However, since this code will be run on a browser, module imports are not handled well. Therefore, imports must be implemented from scratch.
When a module is imported such as,
~~~python
import HALbrowser
~~~
all the definitions inside the module will be put inside the HALbrowser namespace.
The HALbrowser namespace itself is a variable in the current file where the import statement is called. This is a variable of type 'module'.

Some limitations of this approach is that if the file is large, compilation process will take some time. The ability to do it dynamically is not possible unless the integrated editor provided in the browser supports handling multiple files. Fortunately for us, the interface with the robot is small enough and can be parsed quickly.

Now, coming to the interface with WebSim2D, the user of the program will need to import a shim library (such as the one provided in HALbrowser/HALbrowser.py). Shim functions can be identified with the decorator \_\_shim\_\_. When such a function is encountered, it's definition is replaced with equivalent javascript definition (interfacing the simulator).

### Week-4

#### Status/Deliverables
- [x] Test Suite for work done in weeks 1-3.
	- Update the implementation if necessary.

This week involved mostly adding minor improvements (more exceptions, bug fixes) and adding a test suite.
The main difficulty was tracing the cause of the bug once it had been found. This was mainly because the transpiler produces unreadable code. One way to get around this would be to add line numbers in the generated file corresponding to the original python file. This would boost productivity by getting the exact line which has been translated.

I had updated the test suite from Week-1. In Week-1, I was testing for the generated program with the correct program. This however is a very primitive way of testing and it soon broke when the variable declaration strategy changed in Week-3 (i.e, using scopes).
After a discussion with my mentors, they had suggested me to use behaviour-based tests which is more robust.
Each test case is passed into the transpiler and the generated JS code is run to get the output which is then matched with the correct output (i.e, matching the python3 spec).

### Week-3

#### Status/Deliverables
- [x] for and while Statements
- [x] Function Declaration and calls

#### Approach
The examples of constructs that is planned to be supported is put in the examples directory (*functions.py*, *for_statement.py*, *while_statement.py*).

- *while* statements consist of a condition whose truth value needs to be tested on each iteration. They are similar in working in both JavaScript and in python3. The following is an example of translation of while loops.
~~~python
a = 20
while (a > 12):
	a -= 1
~~~
The above python3 snippet is translated in JavaScript to the following.
~~~javascript
var a = new __PyInt__ (20);
while (__gt__ (a, new __PyInt__ (12)).__bool__ () === True) {
	a = __sub__ (a, new __PyInt__ (1));
}
~~~

- *for* statements iterate over a the elements of any sequence (such as list, str, tuple, dict). Any sequence that is to be iterated with a for statement is expected to have an associated iterator. For example, lists have list_iterator which is accessed by calling l.\_\_iter\_\_(), where l is a list.
for...in statements in python3 are just syntactic sugar over the usual for statemnts in languages like C++ or Java.
Translation of for...in statements in python3 will require to have method for sequences (list, etc.) which returns a generator that can be iterated using the for...of block in javascript

~~~python
for x in [1, 2, 3]:
	print (x)
~~~

~~~javascript
for (let x of [1, 2, 3].__iter__()) {
	print.__call__ (x);
}
~~~
, where the *\_\_iter\_\_* method returns a generator object.
~~~javascript
__PyList__.prototype.__iter__ = function * () {
	for (let x of this.array) {
		yield x;
	}
}
~~~

- Functions are more or less equivalent in python3 and JavaScript. For implementation purpose, instead of directly translating a python3 function object to a JavaScript function object, it is instead translated to the primitive \_\_PyFunction\_\_ which will make it more general for implementation.
In python3, if a function does not return anything explicitly, a *None* object is returned. In JavaScript, an *undefined* is returned. To deal with this, the statement *return None;* is added to every function at the end.
For ex,
~~~python
def lt (x, y):
	if (x < y):
		return True
~~~
The above snippet is translated to
~~~javascript
var lt = new __PyFunction__ (function (x, y) {
	if (__lt__ (x, y)) {
		return True;
	}
	return None;
});
~~~
, where None is a constant defined in the file *\_\_PyNone\_\_.js*.

Scoping rules however are different in python3 and JavaScript.
~~~python
a = 20
# Example 1
def func ():
	print (a)

func () # prints 20

# Example 2
def func ():
	print (a)
	a = 10

func () # Throws an UnBoundLocalError since there's a local variable named 'a' in the local scope and it is being accessed before its declaration.

# Example 3
def func ():
	global a # The global statement is used to refer to the variable in the global scope. Any change to it in the current scope results in a change even in its global scope.
	print (a)
	a = 50
func () # prints 20
print (a) # prints 50
~~~

Translation to JavaScript is however not straightforward. JavaScript differentiates between declaration of a variable and assignement to a variables. The programmer makes it explicits in the code.
python3 however relies on the scope (either function scope or normal scope) to find out it a new variable needs to be declared or assigned to an existing one.
~~~javascript
var a = 20;

// Example 1
function func () {
	console.log (a);
}
func (); // prints 20

// Example 2
function func () {
	console.log (a);
	var a = 10;
}
func (); // prints 'undefined'

// Example 3
function func () {
	console.log (a);
	a = 50;
}
func (); // prints 20
console.log (a); // prints 50.
~~~

In the Example 1, the variable *a* is actually referring to the one in the global scope. This works the same in JavaScript, the equivalent code takes the value from the global scope.

For Example 2, there's a variable declaration and NOT an assignement after the print statement. This is because *a* is not referring to the global *a*. In spite of the variable being declared after the print statement, the JavaScript engine does not throw an error because of variable hoisting (it does a few passes of the code before actually compiling and *hoists* the variable declarations).
Variable hoisting is a problem when translating from python3 to JavaScript. A simple example is the following
~~~python3
print (a)
a = 12
~~~
Translating to JavaScript is not straightforward because the declarations are hoisted in JavaScript. The following is **NOT** the correct translation.
~~~javascript
console.log (a); // undefined
var a = 12;
~~~
To solve this problem, one way is to look up the variables in a dictionary. The correct translation of the previous python3 snippet would be the following.
~~~javascript
var __scope__ = new Proxy ({print : print}, {
	get (target, key, recv) {
		if (!(key in target)) {
			throw NameError (`name ${key} is not defined`);
		}
		return target[key];
	}
__scope__.print.__call__ (__scope__.a);
__scope__.a = new __PyInt__ (12);
~~~
Inside functions, the variables must be mapped to their intended references. For example,
~~~python
a = 20
b = 20
def f ():
	global a
	a += 12 // refers to the global a.
	b = 10 //  local variable b
~~~
To figure out the intended reference, we need to maintain an environmenet (mapping) for every scope. Also, the knowledge of the local variables and the global variables in the function comes handy.
~~~javascript
let __scope__ = new Proxy ({}, {
	get (target, key, recv) {
		if (! (key in target)) {
			throw Error (`NameError: name ${key} is not defined`);
		}
		return target[key];
	}
});
__scope__.a = 20;
__scope__.b = 20;

function f () {
	let __globalvars__ = {'a' : true};
	let __localvars__  = {'b' : true};
	let __scope___ = new Proxy ({__parscope__ : __scope__}, {
		get (target, key, recv) {
			if (key in __localvars__) {
				if (key in target) {
					return target[key];
				}
				throw Error (`UnboundLocalError: name ${key} referenced before assginment`);
			} else if (! (key in target)) {
				return target['__parscope__'][key];
			}
			return target[key];
		},
		set (target, key, value, recv) {
			if (key in __globalvars__) {
				target['__parscope__'][key] = value;
			} else {
				target[key] = value;
			}
		}});
	__scope___.a = __scope___.a.__iadd__ (new __PyInt__ (12));
	__scope___.b = new __PyInt__ (20);
	console.log (__scope___.b);
}
~~~




In the third example, the programmer explicity declares that the variable *a* is from the global scope. Hence, when *a* is assigned a value, it means that it is an assignement in JavaScript and not a declaration. So, the *var* keyword is not used.

---

### Week-2

#### Status/Delivarables
- [x] Variable Declaration
- [x] Conditional Statements

#### Approach
Handling variables is tricky. In python3, there's no declaration of variables. You have to assign it.
For ex,
~~~python
a = 1
~~~
In the current scope, a will point to an integer object in memory.
In JavaScript, variables can be declared without assignment (not in the case of 'const').
~~~javascript
var a = 12;
let b = 12;
const c = 12;
~~~
Variables declared with const cannot be changed. Differences in var and let are related to their scope.
let is block scoped, whereas var is function scoped.
~~~javascript
> if (true) {
... var a = 12;
... let b = 12;
... }
undefined
> a
12
> b
ReferenceError: b is not defined
~~~
var seems to be more pythonish than let. However, in python 'for loops', the target variables are block scoped. In JavaScript loops, if the target variable of the loop is declared with var, it ceases to be block scoped.
Therefore, for translation of cases where the varibles might be block scoped, for instance in 'for loops', 'let' is used.
~~~python
for x in range (1, 10):
	# x is block scoped.
	pass
~~~
In JavaScript,
~~~javascript
for (let i = 0; i < 10; i++) {
	// i is block scoped.
}
for (var i = 0; i < 10; i++) {

}
console.log (i); // i is accessible here.
~~~

Scoping rules are praticularly important in functions.
During the execution of functions in python3, the variables are looked up locally and NOT globally. In order to reference a variable globally, we need to use the global keyword, else an exception is thrown.
~~~python
a = 12
def f ():
	global a #In order to reference 'a' from the global scope.
	a += 12
~~~
In JS, variables are looked up globally if not found locally.
~~~javascript
var a = 12;
function f () {
	a += 12; // Updates the 'a' in the global scope.
}
~~~
This is a challenge and I have not yet been able to achieve a concrete way of going about this.

For conditional statements, python3 and JavaScript differ in truth value testing.
The condition is evaluated and the conditional branching is done based on the truth value of the condition.

For python3, the \__bool\__() method is called on the object inside the condition. If this method is not present however, the \__len\__() method is called and the object is considered 'true' if it is non-zero.
If an object has non of those methods, then the truth value is considered true.

JavaScript is however, a bit more crude in the way it evaluates the truth value. Unlike python3 where many things such as addition, subtraction, and even the truth value can be tailored to the programmers need, JavaScript calls the valueOf function for the most part.
The problem is that the same function is used for many tasks such as addition, multiplication, etc. Simply overriding that function will not do much.

Therefore the approach that needs to be taken is to make custom primitive conversions of python3 objects to JavaScript with the methods \__bool\__() included. This way, when a condition X is needed to be checked,
~~~python
if (X):
	stmt
~~~
gets converted to
~~~javascript
if ((X).__bool__() === True) {
	translate (stmt);
}
~~~
True and False are objects of type \__PyBool\__. There exists only one instance of each in the implementation (runtime).
In the absence of the \__bool\__ method, the \__len\__ method needs to be invoked.

---

### Week-1

#### Status/Delivarables
- [x] Expressions
	- int, float, str
	- Arithmetic operations on int, float, str
- [x] Setting up the AST visitor framework.
- [x] Writing basic tests.

#### Approach
Since python3 and JavaScript are very different semantically and there exists no direct translation of primitives such as int, float, str (in python3), one approach is to write the primitive classes in JavaScript corresponding to the primitives of python3 (PyInt, PyFloat, PyStr).

And these classes in JavaScript must have the methods bound to the primitive types in python3 (methods such as \__int__, \__bool__, etc.).

Coming to operators (==, +, -, etc.), the way python3 implements it internally is to replace all operator calls by method calls of objects.
For example,
```python
a, b = 1, 5
a == b # Makes a call to a.__eq__ (b)
a += 1 # Makes a call to a.__iadd__ (1)
```
There are several such methods that need to be implemented for the various operators that python3 supports.
(\__eq__
, \__lt__
, \__le__
, \__gt__
, \__ge__, \__X__ (X = add, mul, sub, div))

The classes set up here will be a part of the larger runtime which is will grow as the support for python3 grows.
The actual translation will involve walking the AST and performing the required translation. In the case of arithmetic expressions, the translation will involve the following.
- Literals (int, float, str) are translated to corresponding objects in js (PyInt, PyFloat, PyStr).
- l op r is translated to l.\__op__ (r).

These primitive classes must later be bootstrapped when classes are implemented in weeks 5&6.

---
