# Week-1

## Status/Delivarables
- [ ] Expressions
	- int, float, str
	- Arithmetic operations on int, float, str
- [ ] Setting up the AST visitor framework.
- [ ] Writing basic tests.

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
