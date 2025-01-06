# TimeUp

A reverse uptime service for endpoints that are not publicly exposed

## Description

TimeUp is an uptime service for situations where you want a publicly available
uptime service that monitors the status of machines that are not exposed.
Instead of being the uptime service to ping the endpoints that have to be
monitored, it's the endpoint that pings the TimeUp service (hence the name
TimeUp as a reversed uptime service). This allows the endpoints to remain not
publicly exposed.

For example, this is my usecase: I have an homelab that isn't exposd to the
public, but I would like to be able to check its status while not at home. I can
put an instance of TimeUp on a cheap untrusted and publicly exposed VPS and tell
my homelab to ping this VPS, enabling me to see the status of my private homelab
without exposing it.

## Usage

> [!WARNING]
> This is a work in progress, and will not actually work as
> advertised. This paragraph is about how it will work when ready

TimeUp is composed of two parts: a server, which is meant to be publicly
exposed, and a client, which is meant to be private.

The client regularly pings the server, which keeps track of which endpoints
pinged since the last update and uses this to tell which endpoints are up or
down. For safety measures, the client pings at double the frequency at which the
server checks for pings.

Both the server and the client are docker images that can be installed anywhere.
The server will need a list of endpoints to monitor, while the client will need
to know the address of the server to ping it
