# Week-1

## Status/Delivarables
- [x] Expressions
	- int, float, str
	- Arithmetic operations on int, float, str
- [x] Setting up the AST visitor framework.
- [x] Writing basic tests.

## Approach
Since python3 and JavaScript are very different semantically and there exists no direct translation of primitives such as int, float, str (in python3), one approach is to write the primitive classes in JavaScript corresponding to the primitives of python3 (PyInt, PyFloat, PyStr).

And these classes in JavaScript must have the methods bound to the primitive types in python3 (methods such as \__int__, \__bool__, etc.).

Coming to operators (==, +, -, etc.), the way python3 implements it internally is to replace all operator calls by method calls of objects.
For example,
```
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

# Week-2

## Status/Delivarables
- [ ] Variable Declaration
- [ ] Conditional Statements

## Approach
Handling variables is tricky. In python3, there's no declaration of variables. You have to assign it.
For ex,
~~~
a = 1
~~~
In the current scope, a will point to an integer object in memory.
In JavaScript, variables can be declared without assignment (not in the case of 'const').
~~~
var a = 12;
let b = 12;
const c = 12;
~~~
Variables declared with const cannot be changed. Differences in var and let are related to their scope.
let is block scoped, whereas var is function scoped.
~~~
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
~~~
for x in range (1, 10):
	# x is block scoped.
	pass
~~~
In JavaScript,
~~~
for (let i = 0; i < 10; i++) {
	// i is block scoped.
}
for (var i = 0; i < 10; i++) {

}
console.log (i); // i is accessible here.
~~~

Scoping rules are praticularly important in functions.
During the execution of functions in python3, the variables are looked up locally and NOT globally. In order to reference a variable globally, we need to use the global keyword, else an exception is thrown.
~~~
a = 12
def f ():
	global a #In order to reference 'a' from the global scope.
	a += 12
~~~
In JS, variables are looked up globally if not found locally.
~~~
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
~~~
if (X):
	stmt
~~~
gets converted to
~~~
if ((X).__bool__() === True) {
	translate (stmt);
}
~~~
True and False are objects of type \__PyBool\__. There exists only one instance of each in the implementation (runtime).
In the absence of the \__bool\__ method, the \__len\__ method needs to be invoked.
