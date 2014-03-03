<?php
/**
 * Multi-site WordPress API
 *
 * @package WordPress
 * @subpackage Multisite
 * @since 3.0.0
 */

function get_sitestats() {
	global $wpdb;

	$stats['blogs'] = get_blog_count();

	$count_ts = get_site_option( 'user_count_ts' );
	if ( time() - $count_ts > 3600 ) {
		$count = $wpdb->get_var( "SELECT COUNT(ID) FROM $wpdb->users" );
		update_site_option( 'user_count', $count );
		update_site_option( 'user_count_ts', time() );
	} else {
		$count = get_site_option( 'user_count' );
	}
	$stats['users'] = $count;
	return $stats;
}

function get_admin_users_for_domain( $sitedomain = '', $path = '' ) {
	global $wpdb;

	if ( ! $sitedomain )
		$site_id = $wpdb->siteid;
	else
		$site_id = $wpdb->get_var( $wpdb->prepare( "SELECT id FROM $wpdb->site WHERE domain = %s AND path = %s", $sitedomain, $path ) );

	if ( $site_id )
		return $wpdb->get_results( $wpdb->prepare( "SELECT u.ID, u.user_login, u.user_pass FROM $wpdb->users AS u, $wpdb->sitemeta AS sm WHERE sm.meta_key = 'admin_user_id' AND u.ID = sm.meta_value AND sm.site_id = %d", $site_id ), ARRAY_A );

	return false;
}

function get_blogs_of_user( $id, $all = false ) {
	global $wpdb;

	$cache_suffix = $all ? '_all' : '_short';
	$return = wp_cache_get( 'blogs_of_user_' . $id . $cache_suffix, 'users' );
	if ( $return )
		return apply_filters( 'get_blogs_of_user', $return, $id, $all );

	$user = get_userdata( (int) $id );
	if ( !$user )
		return false;

	$blogs = $match = array();
	$prefix_length = strlen($wpdb->base_prefix);
	foreach ( (array) $user as $key => $value ) {
		if ( $prefix_length && substr($key, 0, $prefix_length) != $wpdb->base_prefix )
			continue;
		if ( substr($key, -12, 12) != 'capabilities' )
			continue;
		if ( preg_match( '/^' . $wpdb->base_prefix . '((\d+)_)?capabilities$/', $key, $match ) ) {
			if ( count( $match ) > 2 )
				$blog_id = $match[ 2 ];
			else
				$blog_id = 1;
			$blog = get_blog_details( $blog_id );
			if ( $blog && isset( $blog->domain ) && ( $all == true || $all == false && ( $blog->archived == 0 && $blog->spam == 0 && $blog->deleted == 0 ) ) ) {
				$blogs[ $blog_id ]->userblog_id	= $blog_id;
				$blogs[ $blog_id ]->blogname		= $blog->blogname;
				$blogs[ $blog_id ]->domain		= $blog->domain;
				$blogs[ $blog_id ]->path			= $blog->path;
				$blogs[ $blog_id ]->site_id		= $blog->site_id;
				$blogs[ $blog_id ]->siteurl		= $blog->siteurl;
			}
		}
	}

	wp_cache_add( 'blogs_of_user_' . $id . $cache_suffix, $blogs, 'users', 5 );
	return apply_filters( 'get_blogs_of_user', $blogs, $id, $all );
}

function get_active_blog_for_user( $user_id ) { // get an active blog for user - either primary blog or from blogs list
	global $wpdb;
	$blogs = get_blogs_of_user( $user_id );
	if ( empty( $blogs ) ) {
		$details = get_dashboard_blog();
		add_user_to_blog( $details->blog_id, $user_id, 'subsc