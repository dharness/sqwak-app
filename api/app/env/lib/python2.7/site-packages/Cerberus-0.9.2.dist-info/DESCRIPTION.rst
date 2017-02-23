Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.

Description: Cerberus
        ========
        .. image:: https://secure.travis-ci.org/nicolaiarocci/cerberus.png?branch=master
                :target: https://secure.travis-ci.org/nicolaiarocci/cerberus
        
        Cerberus is a lightweight and extensible data validation library for Python.
        
        .. code-block:: pycon
        
            >>> v = Validator({'name': {'type': 'string'}})
            >>> v.validate({'name': 'john doe'})
            True
        
        Features
        --------
        Cerberus provides type checking and other base functionality out of the box and
        is designed to be non-blocking and easily extensible, allowing for custom
        validation. It has no dependancies and is thoroughly tested under Python 2.6,
        Python 2.7, Python 3.3, Python 3.4, PyPy and PyPy3.
        
        Documentation
        -------------
        Complete documentation is available at http://python-cerberus.org
        
        Installation
        ------------
        Cerberus is on PyPI so all you need is:
        
        .. code-block:: console
        
            $ pip install cerberus
        
        Testing
        -------
        Just run:
        
        .. code-block:: console
        
            $ python setup.py test
        
        Or you can use tox to run the tests under all supported Python versions. Make
        sure the required python versions are installed and run:
        
        .. code-block:: console
        
            $ pip install tox  # first time only
            $ tox
        
        Contributing
        ------------
        Please see the `Contribution Guidelines`_.
        
        
        Copyright
        ---------
        Cerberus is an open source project by `Nicola Iarocci
        <http://nicolaiarocci.com>`_. See the original `LICENSE
        <https://github.com/nicolaiarocci/cerberus/blob/master/LICENSE>`_ for more
        informations.
        
        .. _`Contribution Guidelines`: https://github.com/nicolaiarocci/cerberus/blob/master/CONTRIBUTING.rst
        
Keywords: validation,schema,dictionaries
Platform: any
Classifier: Development Status :: 4 - Beta
Classifier: Intended Audience :: Developers
Classifier: Natural Language :: English
Classifier: License :: OSI Approved :: ISC License (ISCL)
Classifier: Operating System :: OS Independent
Classifier: Programming Language :: Python
Classifier: Programming Language :: Python :: 2
Classifier: Programming Language :: Python :: 2.6
Classifier: Programming Language :: Python :: 2.7
Classifier: Programming Language :: Python :: 3
Classifier: Programming Language :: Python :: 3.3
Classifier: Programming Language :: Python :: 3.4
