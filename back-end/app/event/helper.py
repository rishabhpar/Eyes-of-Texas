from flask import make_response, jsonify, url_for
from app import app
from app.models import Event, Vote
from geoalchemy2.elements import WKTElement


def response(status, message, code):
    """
    Helper method to make a http response
    :param status: Status message
    :param message: Response message
    :param code: Response status code
    :return: Http Response
    """
    return make_response(jsonify({
        'status': status,
        'message': message
    })), code


def get_event_json_list(events, current_user):
    """
    Make json objects of the user buckets and add them to a list.
    :param events: Event
    :return:
    """
    arr = []
    for event in events:
        arr.append(event.json(current_user))
    return arr


def response_with_pagination(events, previous, nex):
    """
    Make a http response for BucketList get requests.
    :param count: Pagination Total
    :param nex: Next page Url if it exists
    :param previous: Previous page Url if it exists
    :param buckets: Bucket
    :return: Http Json response
    """
    return make_response(jsonify({
        'status': 'success',
        'previous': previous,
        'next': nex,
        'count': len(events),
        'events': events
    })), 200


def response_for_created_event(event):
    return make_response(jsonify({
        'status': 'success',
        'event': event
    })), 201


def get_events(lng, lat, radius=1000):
    center = WKTElement('POINT({0} {1})'.format(lng, lat), srid=4326)
    return Event.query.filter(db.func.ST_DWITHIN(Event.location, center, radius)).order_by(Event.vote_count)


def list_categories(query):
    arr = []
    for category in query:
        arr.append(category.name)
    return arr


def paginate_events(page, q):
    """
    Get a user by Id, then get hold of their buckets and also paginate the results.
    There is also an option to search for a bucket name if the query param is set.
    Generate previous and next pagination urls
    :param q: Query parameter
    :param user_id: User Id
    :param user: Current User
    :param page: Page number
    :return: Pagination next url, previous url and the user buckets.
    """
    
    pagination = Event.query.order_by(Event.vote_count) \
        .paginate(page=page, per_page=app.config['BUCKET_AND_ITEMS_PER_PAGE'], error_out=False)
   
    previous = None
    if pagination.has_prev:
        previous = url_for('event.events', page=page - 1, _external=True)
    nex = None
    if pagination.has_next:
        nex = url_for('event.events', page=page + 1, _external=True)
    items = pagination.items
    return items, nex, pagination, previous