<?php
/*
 * Plugin Name: VIN Decoder
 * Plugin URI: http://www.vijaywebsolutions.com/
 * Description: A plugin that helps to find the information through vin number.
 * Version: 1.0.2
 * Author: Vijay Web Solutions
 * Author URI: http://www.vijaywebsolutions.com/
 * License: GPL2
 */
if ( ! defined( 'WPINC' ) ) {
    die;
}
add_action( 'wp_enqueue_scripts', 'vin_plugin_style' );
function vin_plugin_style() {
	wp_enqueue_style( 'custom-vin-front-css', plugins_url('/css/vin-decoder-css.css', __FILE__) );	
	wp_enqueue_script( 'jquery-ajax-script', plugins_url('/js/jquery.ajax-api.js', __FILE__) );	
	wp_enqueue_style( 'lightbox-css', plugins_url('/css/lightbox.css', __FILE__) );	
}
add_shortcode('VINFinder', 'vin_finder');
function vin_finder(){ 
?>
    <div id="vin-data-box">
       <label>Enter Your VIN</label>
       <input type="text" name="vin_number" id="vin_number" value="" required="required" />   
       <input type="hidden" name="urls" id="urls" value="http://www.vijaywebsolutions.com/vin_decoder/decoder.php" />
        <input type="hidden" name="img_urls" id="img_urls" value="http://www.vijaywebsolutions.com/vin_decoder/img_decoder.php" />
       <input type="submit" name="submit" value="Decode" onclick="get_vin()" />
      <div class="table"  id="loader" style="display:none;"><div class="cell"><div class="gmb-loader"><div></div><div></div><div></div></div></div></div>
    </div>
    <div id="vin_Info">
    </div>
<?php  
 }
?>