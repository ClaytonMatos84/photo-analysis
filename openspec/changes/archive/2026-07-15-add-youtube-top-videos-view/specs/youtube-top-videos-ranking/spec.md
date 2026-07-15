## ADDED Requirements

### Requirement: Display top-views ranking
The system SHALL display a ranking of YouTube videos ordered by view count, fetched from `GET /youtube-analysis/top-views?limit=N`. Each item SHALL show rank position, YouTube thumbnail, title, author, view count formatted in Brazilian locale, and a link to watch on YouTube.

#### Scenario: Successful top-views load with default limit
- **WHEN** user navigates to the top videos view
- **THEN** the system fetches top-views with limit=5 and displays up to 5 videos ranked by viewCount descending

#### Scenario: Successful top-views load with custom limit
- **WHEN** user changes the limit control to 10
- **THEN** the system fetches top-views with limit=10 and displays up to 10 videos ranked by viewCount descending

#### Scenario: Empty top-views result
- **WHEN** the API returns an empty videos array for top-views
- **THEN** the system displays an empty state message in the top-views section

### Requirement: Display top-likes ranking
The system SHALL display a ranking of YouTube videos ordered by like count, fetched from `GET /youtube-analysis/top-likes?limit=N`. Each item SHALL show rank position, YouTube thumbnail, title, author, like count formatted in Brazilian locale, and a link to watch on YouTube.

#### Scenario: Successful top-likes load with default limit
- **WHEN** user navigates to the top videos view
- **THEN** the system fetches top-likes with limit=5 and displays up to 5 videos ranked by likeCount descending

#### Scenario: Empty top-likes result
- **WHEN** the API returns an empty videos array for top-likes
- **THEN** the system displays an empty state message in the top-likes section

### Requirement: Limit control for ranking size
The system SHALL provide an InputNumber control (PrimeVue) allowing the user to set how many videos appear in both rankings. The default value SHALL be 5. The minimum value SHALL be 3, the maximum SHALL be 10, and the step SHALL be 1. Changing the value SHALL reload both rankings simultaneously.

#### Scenario: User increases limit
- **WHEN** user changes the limit from 5 to 8
- **THEN** both top-views and top-likes rankings reload with limit=8

#### Scenario: User sets limit to minimum
- **WHEN** user changes the limit to 3
- **THEN** both rankings display up to 3 videos each

#### Scenario: User sets limit to maximum
- **WHEN** user changes the limit to 10
- **THEN** both rankings display up to 10 videos each

#### Scenario: User cannot set limit below minimum
- **WHEN** user attempts to set the limit below 3
- **THEN** the InputNumber constrains the value to 3

#### Scenario: User cannot set limit above maximum
- **WHEN** user attempts to set the limit above 10
- **THEN** the InputNumber constrains the value to 10

### Requirement: Rank position indicators
The system SHALL display position indicators for each video in the ranking. Positions 1, 2, and 3 SHALL use medal emojis (🥇, 🥈, 🥉). Positions 4 and above SHALL display the numeric position.

#### Scenario: Top 3 videos display medals
- **WHEN** the ranking has at least 3 videos
- **THEN** position 1 shows 🥇, position 2 shows 🥈, position 3 shows 🥉

#### Scenario: Position 4 and beyond display numbers
- **WHEN** the ranking has 5 or more videos
- **THEN** position 4 shows "4" and position 5 shows "5"

### Requirement: YouTube thumbnails
The system SHALL display a thumbnail image for each video using the URL `https://img.youtube.com/vi/{videoId}/mqdefault.jpg`. If the thumbnail fails to load, the system SHALL display a fallback placeholder.

#### Scenario: Thumbnail loads successfully
- **WHEN** a video has videoId "YsSoGX2uQbs"
- **THEN** the thumbnail src is "https://img.youtube.com/vi/YsSoGX2uQbs/mqdefault.jpg"

#### Scenario: Thumbnail fails to load
- **WHEN** the thumbnail image triggers an error event
- **THEN** a fallback placeholder image or icon is displayed instead

### Requirement: Metric formatting in Brazilian locale
The system SHALL format viewCount and likeCount using Brazilian number formatting (dot as thousands separator). Example: 1115427 SHALL display as "1.115.427".

#### Scenario: Large number formatting
- **WHEN** a video has viewCount 1115427
- **THEN** the displayed value is "1.115.427"

#### Scenario: Small number formatting
- **WHEN** a video has likeCount 24561
- **THEN** the displayed value is "24.561"

### Requirement: Watch link opens in new tab
Each video in the ranking SHALL have a link using the `youtubeUrl` field that opens in a new browser tab (`target="_blank"`, `rel="noopener noreferrer"`).

#### Scenario: Click watch link
- **WHEN** user clicks the "Assistir" link on a ranking video
- **THEN** the YouTube video opens in a new browser tab

### Requirement: Skeleton loading state
While API data is loading, the system SHALL display skeleton placeholders in both ranking sections. Skeletons SHALL disappear once data is loaded.

#### Scenario: Initial page load
- **WHEN** the page is loading data for the first time
- **THEN** skeleton placeholders are shown in both top-views and top-likes sections

#### Scenario: Data loaded
- **WHEN** API responses are received
- **THEN** skeletons are replaced with actual video data

### Requirement: Route and navigation
The system SHALL register route `/youtube-top-videos` with lazy-loaded `YouTubeTopVideosView.vue`. The route SHALL require authentication. The sidebar menu SHALL include "Top Vídeos YouTube" with `pi-chart-bar` icon, placed after the "Análise de vídeo YouTube" item.

#### Scenario: Navigate via menu
- **WHEN** user clicks "Top Vídeos YouTube" in the sidebar
- **THEN** the router navigates to `/youtube-top-videos` and the view renders

#### Scenario: Unauthenticated access
- **WHEN** an unauthenticated user navigates to `/youtube-top-videos`
- **THEN** the auth guard redirects to the login page
