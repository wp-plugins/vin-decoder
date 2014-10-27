<?php
/*
 * Plugin Name: VIN Decoder
 * Plugin URI: http://www.vijaywebsolutions.com/
 * Description: A plugin that helps to find the information through vin number.
 * Version: 1.0
 * Author: Vijay Web Solutions
 * Author URI: http://www.vijaywebsolutions.com/
 * License: GPL2
 */

if ( ! defined( 'WPINC' ) ) {
    die;
}


add_action( 'wp_enqueue_scripts', 'vin_plugin_style' );

function vin_plugin_style() {
	wp_register_style( 'custom-wp-admin-css', plugins_url().'/vin-decoder/css/vin-decoder-css.css', false, '1.0.0' );
	wp_enqueue_style( 'custom-wp-admin-css' );
	
	wp_register_script( 'jquery-ajax-script', plugins_url().'/vin-decoder/js/jquery.ajax-api.js' );
	wp_enqueue_script( 'jquery-ajax-script');
}

add_shortcode('VINFinder', 'vin_finder');

function vin_finder(){ 
?>
<div id="vin-data-box">
   <label>Enter Your VIN</label>
   <input type="text" name="vin_number" id="vin_number" value="" required="required" />
   
   <input type="hidden" name="urls" id="urls" value="http://www.vijaywebsolutions.com/vin_decoder/decoder.php" />
   
   <input type="submit" name="submit" value="Decode" onclick="get_vin()" />
  <div class="table"  id="loader" style="display:none;"><div class="cell"><div class="gmb-loader"><div></div><div></div><div></div></div></div></div>
 
</div>

<div id="vin_Info">
</div>

</div>
<?php  
}
?>
