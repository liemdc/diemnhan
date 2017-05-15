<?php
/**
 * @package Addon Library
 * @author UniteCMS.net
 * @copyright (C) 2012 Unite CMS, All Rights Reserved. 
 * @license GNU/GPLv3 http://www.gnu.org/licenses/gpl-3.0.html
 * */
defined('ADDON_LIBRARY_INC') or die('Restricted access');

 
 class UniteBaseAdminClassUC{
 	
		
		protected static $master_view;
		protected static $view;
		
		private static $arrSettings = array();
		private static $tempVars = array();
		
		
		/**
		 * 
		 * main constructor		 
		 */
		public function __construct(){
						
			$this->initView();
			
			//self::addCommonScripts();
		}		
		
		/**
		 * 
		 * get path to settings file
		 * @param $settingsFile
		 */
		protected static function getSettingsFilePath($settingsFile){
			
			$filepath = self::$path_plugin."settings/$settingsFile.php";
			return($filepath);
		}
		
		
		/**
		 * 
		 * set the view from GET variables
		 */
		private function initView(){
			
			$defaultView = GlobalsUC::$view_default;
			
			//set view
			$viewInput = UniteFunctionsUC::getGetVar("view","",UniteFunctionsUC::SANITIZE_KEY);
			$page = UniteFunctionsUC::getGetVar("page","",UniteFunctionsUC::SANITIZE_KEY);
						
			//get the view out of the page
			$deviderPos = strpos($page,"_");
			if($deviderPos !== false){
				$view = substr($page, $deviderPos+1);
			}
			
			if(!empty($viewInput))
				$view = $viewInput;
			
			if(empty($view)){
				$view = $defaultView;
			}
			
			
			self::$view = $view;
						
		}
		
		
		
		
		/**
		 * 
		 * set view that will be the master
		 */
		protected static function setMasterView($masterView){
			self::$master_view = $masterView;
		}
		
		/**
		 * 
		 * inlcude some view file
		 */
		protected static function requireView($view){
			
			try{
				
				//require master view file, and 
				if(!empty(self::$master_view) && !isset(self::$tempVars["is_masterView"]) ){
					$masterViewFilepath = GlobalsUC::$pathViews.self::$master_view.".php";
					
					UniteFunctionsUC::validateFilepath($masterViewFilepath,"Master View");
					
					self::$tempVars["is_masterView"] = true;
										
					require $masterViewFilepath;
										
				}
				else{		//simple require the view file.
					
					$viewFilepath = GlobalsUC::$pathViews.$view.".php";
					$pathViewProvider = GlobalsUC::$pathProviderViews.$view.".php";
					
					//replace thef ile by provider view file if needed
					if(file_exists($viewFilepath) == false && file_exists($pathViewProvider) == true)
						$viewFilepath = $pathViewProvider;
					
					$viewFilepath = UniteProviderFunctionsUC::applyFilters(UniteCreatorFilters::FILTER_ADMIN_VIEW_FILEPATH, $viewFilepath, $view);
					
					UniteFunctionsUC::validateFilepath($viewFilepath,"View");
										
					require $viewFilepath;
					
				}
				
			}catch (Exception $e){
				echo "<div id='uc_view_error_message'> <br><br>View ($view) Error: <b>".$e->getMessage()."</b></div>";
				
				?>
				<script>
					jQuery(document).ready(function(){
						var htmlError = jQuery("#uc_view_error_message").html();
						jQuery("#viewWrapper").html(htmlError);
					});
				</script>
				<?php 
				
				if(GlobalsUC::SHOW_TRACE == true)
					dmp($e->getTraceAsString());
			}
		}
		
		
		/**
		 * 
		 * require settings file, the filename without .php
		 */
		protected static function requireSettings($settingsFile){
						
			try{
				require self::$path_plugin."settings/$settingsFile.php";
			}catch (Exception $e){
				echo "<br><br>Settings ($settingsFile) Error: <b>".$e->getMessage()."</b>";
				dmp($e->getTraceAsString());
			}
		}
		
		/**
		 * get view
		 */
		public static function getView(){
			
			return self::$view;
		}
		
		/**
		 * set view manually
		 */
		public static function setView($view){
			self::$view = $view;
		}
 	
 }
 
 ?>