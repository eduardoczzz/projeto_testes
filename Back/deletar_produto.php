<?php 
include('../banco/config.php');

$user_id = $_POST['id'];
$sql = "DELETE FROM orcamento WHERE id='$user_id'";
$delQuery =mysqli_query($conexao,$sql);
if($delQuery==true)
{
	 $data = array(
        'status'=>'success',
       
    );

    echo json_encode($data);
}
else
{
     $data = array(
        'status'=>'failed',
      
    );

    echo json_encode($data);
} 

?>