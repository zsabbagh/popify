# User Evaluation - development 

For this user evaluation, the user was asked to browse
to popify.se and explore the page, while thinking put loud.
The session was recorded, and its content presented in
the bullets below.

## Problems
1. The user found the "add to playlist"-button after 16 minutes
2. The user pressed "get recommendations" without selecting artists
or tracks
3. The user selected 5 tracks, but did not press "get recommendations" - 
no new recommendations were fetched
4. The user created a new playlist with a costumed name, but could not
find the new playlist in the list in a second try
5. The user added recommendations to a playlist called "New Playlist",
which adds the songs to an already existing playlist with the same name.
6. The search results are changed if the page is updated
7. Search for genre is not possible
8. The "welcome"-page is not shown if the user has been logged in before
9. Search results are not very specific. User can not find album "Rare" 
with "David Bowie", for instance, regardless of tab
10. The recommendations are not compatible with all genres, and does not
generate any recommendations 
11. It is not possible to search for genres in the general search
12. The app does not work on a smaller screen, like a phone

## User feedback
13. Would like more of top songs to select for recommendations. 
The user likes the recommendation page, but would like to have more
than  the 10 top items to choose from in order to generate recommended
songs
14. The "popularity" needs explanation - what is it? 
15. What is the rating-circles in the regular search? 
16. The icon of a shopping cart indicates that the user have to pay,
maybe it could be switched to something else
17. It is a bit unclear what is added to the playlists - is it the
selected songs or the recommendations? 
18. User could benefit from choosing among the recommendations to add to
playlist.
19. Some of the cards that can be opened, like genre, don't seem to have a
clear functionality, and could be removed if they don't provide any
additional information. 
20. Would like the cards smaller, to see more and get a better overview.
Could be nice with a view selection, where the user can choose how many 
items to show per row.
21. The user could benefit from having a clearer overview of the playlist
that is to be generated
22. The user is annoyed they can only choose 5 items. 

## Addressed issues
Issue 1-3: 

    Since there were a lot of issues regarding the 
    recommendations page, it was moved to the checkout 
    page, where the selections have been made in
    previous steps, which makes it more user friendly. 

10:

    It has been made sure that all presented data is 
    suitable for generating recommendations, unless
    other is stated to the user. 

12:

    The issue have been addressed, but not fully solved.
    The page is viewable on a smaller screen, but not
    optimized.

13:

    On the first version of recommendation page, the user 
    could only select from the top 10 artists, and top 10
    tracks. By moving the recommendations to the last 
    step, the user can now choose freely among all shown 
    items on Popify.

17:
        
    The buttons for "Get recommendations" and "Add songs
    to playlist" were more strategically located. The view
    for checkout has been redesigned. 

19:

    The imformation on the cards was made clickable in 
    order to make them more interactive, and have 
    actual value to the user. 

21: 

    The checkout view was added to address this,
    where the user is provided with an overview of 
    the previuosly selected items and can choose to
    generate a playlist with the recommended songs

22: 

    The limitation of 5 items comes from the API.
    Feedback was added as a pop-up when an item is
    added to the cart. The cart itself has an indicator
    that shows how many items is in the cart, and a 
    circle around the cart icon shows how full it is. 
    
