# Eyes-of-Texas

The repo for the Eyes-of-Texas Convergent project. The application is designed to aggregate campus events for UT Austin, with the end goal of increasing both visibility and convenience.

# Layout
The layout of the project is split into two major components: 

* Front-end
    * Event Map Interface
    * Event List with a ranking system
    * Event Submission Form
* Back-end
    * API for frontend providing insertion, deletion and modification functionality
    * Database, either SQL or NoSQL

# Development Setup

## Frontend 

To be continued...

## Backend

The backend is written using Flask, so there are a few requirements. These requirements are listed in `requirements.txt`. To install, first make sure that you have Python 3 installed on your system. It is also recommended to use a virtual environment so as to keep your packages clean. The set up is as follows:

### Install virtualenv

#### On Windows:

```
pip install virtualenv
```

#### On Mac/Linux:

```
pip3 install virtualenv
```

### Create a new virtualenv

#### On Windows:

```
python -m venv back-end
```

#### On Mac/Linux:

```
python3 -m venv back-end
```

### Activate the virtualenv

#### On Windows:

```
\back-end\Scripts\activate.bat
```

#### On Mac/Linux:

```
source back-end/bin/activate
```

### Install the requirements

#### On Windows:

```
pip install -r requirements.txt
```

#### On Mac/Linux:

```
pip3 install -r requirements.txt
```


End of readme (test)

