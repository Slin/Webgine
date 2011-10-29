<?php
function ListFolder($path)
{
    //using the opendir function
    $dir_handle = @opendir($path) or die("Unable to open $path");
   
    //Leave only the lastest folder name
    $dirname = end(explode("/", $path));
   
    //display the target folder.
    while (false !== ($file = readdir($dir_handle)))
    {
        if($file!="." && $file!="..")
        {
            if (!is_dir($path."/".$file))
            {
                $pos = strpos($file, ".html");
                if(!($pos === false))
                {
                    $files[] = $file;
                }
            }
        }
    }
    
    sort($files);
    foreach($files as $file)
    {
        //Display a list of files.
        echo "<li> <a href='http://slindev.com/$dirname/$file'>$file</a></li>";
    }
    
    //closing the directory
    closedir($dir_handle);
}
?>

<ul>
	<table width="100%">
		<tr align="left" valign="top">
			<?php ListFolder("/var/www/web351/html/webgine"); ?>
		<tr>
	</table>
</ul>