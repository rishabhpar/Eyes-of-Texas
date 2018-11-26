from flask import Blueprint, request, make_response, jsonify
from app.auth.helper import token_required
from app.event.helper import get_events, get_event_json_list, response_with_pagination, response
from app.models import User, Event

# Initialize blueprint
event = Blueprint('event', __name__)

@event.route('/events/', methods=['GET'])
@token_required
def events(current_user):
    """
    Return events per page - limit them to 10.
    Return an empty events object if there are no events
    :param current_user:
    :return:
    """

    # TODO: pagination for events, check incorrect params, add try/catch for exception handling

    # page = request.args.get('page', 1, type=int)
    # q = request.args.get('q', None, type=str)

    lng = request.args.get('lng', None, type=float)
    lat = request.args.get('lat', None, type=float)
    rad = request.args.get('rad', 1000, type=int)

    if not lng or not lat:
        return response('failed', 'Missing params longitude/latitude', 400)

    events = get_events(lng, lat, rad)

    if events:
        return response_with_pagination(get_event_json_list(events, current_user), None, None)

    return response_with_pagination([], None, None)


@event.route('/events/', methods=['POST'])
@token_required
def create_event(current_user):
    """
    Create an Event from the sent json data.
    :param current_user: Current User
    :return:
    """

    #TODO: handle input validation

    if request.content_type == 'application/json':
        data = request.get_json()
        title = data.get('title')
        time_event = data.get('time_event')
        desc = data.get('desc')
        lng = float(data.get('lng'))
        lat = float(data.get('lat'))
        categories = data.get('categories')

        if not title or not time_event or not desc or not lng or not lat or categories is None:
            return response('failed', 'Missing attributes', 400)

        created_event = Event(current_user.id, title, time_event, desc, lng, lat, categories)

        created_event.save()

        return response_for_created_event(created_event.json(current_user))

    return response('failed', 'Content-type must be json', 202)


@event.route('/favorite/<event_id>', methods=['POST'])
@token_required
def favorite_event(current_user, event_id):
    res = current_user.favorite_event(event_id)
    if res:
        return response('success', 'Favorited event', 200)
    return response('failed', 'Could not favorite event', 400)

#TODO: change POST to DELETE and keep same url? is that better 

@event.route('/unfavorite/<event_id>', methods=['POST'])
@token_required
def unfavorite_event(current_user, event_id):
    res = current_user.remove_favorite(event_id)
    if res:
        return response('success', 'Removed favorite event', 200)
    return response('failed', 'Could not unfavorite event', 400)


@event.route('/vote/<event_id>', methods=['POST'])
@token_required
def vote_event(current_user, event_id):
    res = Vote.upvote(event_id, current_user.id)
    if res:
        return response('success', 'Upvoted event', 200)
    return response('failed', 'Could not vote on event', 400)


@event.route('/unvote/<event_id>', methods=['POST'])
@token_required
def unvote_event(current_user, event_id):
    res = Vote.remove_vote(event_id, current_user.id)
    if res:
        return response('success', 'Unvoted event', 200)
    return response('failed', 'Could not unvote event', 400)


#TODO: test how this works with empty favorites, etc etc

@event.route('/favorites/', methods=['GET'])
@token_required
def favorite_event_list(current_user):
    return response_with_pagination(get_event_json_list(current_user.favorites, current_user), None, None)



@event.errorhandler(404)
def handle_404_error(e):
    """
    Return a custom message for 404 errors.
    :param e:
    :return:
    """
    return response('failed', 'Event cannot be found', 404)


@event.errorhandler(400)
def handle_400_errors(e):
    """
    Return a custom response for 400 errors.
    :param e:
    :return:
    """
    return response('failed', 'Bad Request', 400)
