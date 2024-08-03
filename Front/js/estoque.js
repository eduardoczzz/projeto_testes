$(document).ready(function() {
  $('#tabela').DataTable({
    "fnCreatedRow": function(nRow, aData, iDataIndex) {
      $(nRow).attr('id', aData[0]);
    },
    'serverSide': 'true',
    'processing': 'true',
    'paging': 'true',
    'order': [],
    'ajax': {
      'url': '../back/buscar_dados.php',
      'type': 'post',
    },
    "aoColumnDefs": [{
        "bSortable": false,
        "aTargets": [6]
      },

    ]
  });
});

$(document).on('submit', '#updateUser', function(e) {
  e.preventDefault();

  var produto = $('#produtoField').val();
  var quantidade = $('#quantidadeField').val();
  var fornecedor = $('#fornecedorField').val();
  var nota_fiscal = $('#nota_fiscalField').val();
  var estado_uso = $('#estado_usoField').val();
  var id = $('#id').val();

  if (produto !== '' && quantidade !== '' && fornecedor !== '' && nota_fiscal !== '' && estado_uso !== '') {
      $.ajax({
          url: "../back/atualizar_estoque.php",
          type: "post",
          data: {
              produto: produto,
              quantidade: quantidade,
              fornecedor: fornecedor,
              nota_fiscal: nota_fiscal,
              estado_uso: estado_uso,
              id: id
          },
          success: function(data) {
            var json = JSON.parse(data);
            var status = json.status;
            if (status == 'true') {
              var table = $('#tabela').DataTable();
              var button = '<td><a href="javascript:void();" data-id="' + id + '" class="btn btn-info btn-sm editbtn">Editar</a>  <a href="#!"  data-id="' + id + '"  class="btn btn-danger btn-sm deleteBtn">Deletar</a></td>';
              var row = table.row("[id='" + trid + "']");
              row.row("[id='" + trid + "']").data([id, produto, quantidade, fornecedor, nota_fiscal, estado_uso, button]);
              $('#exampleModal').modal('hide');
            } else {
              alert('failed');
            }
          }
      });
  } else {
    alert('Fill all the required fields');
  }
});

$('#tabela').on('click', '.editbtn ', function(event) {
  var table = $('#tabela').DataTable();
  var trid = $(this).closest('tr').attr('id');
  var id = $(this).data('id');
  $('#exampleModal').modal('show');
  $.ajax({
    url: "../back/obter_dados.php",
    data: {
      id: id
    },
    type: 'post',
    success: function(data) {
      var json = JSON.parse(data);
      $('#produtoField').val(json.produto);
      $('#quantidadeField').val(json.quantidade);
      $('#fornecedorField').val(json.fornecedor);
      $('#nota_fiscalField').val(json.nota_fiscal);
      $('#estado_usoField').val(json.estado_uso);
      $('#id').val(id);
      $('#trid').val(trid);
    }
  })
});

$(document).on('click', '.deleteBtn', function(event) {
  var table = $('#tabela').DataTable();
  event.preventDefault();
  var id = $(this).data('id');
  if (confirm("Voce quer deletar mesmo esse equipamento?")) {
    $.ajax({
      url: "../back/deletar_estoque.php",
      data: {
        id: id
      },
      type: "post",
      success: function(data) {
        var json = JSON.parse(data);
        status = json.status;
        if (status == 'success') {
          $("#" + id).closest('tr').remove();
        } else {
          alert('Failed');
          return;
        }
      }
    });
  } else {
    return null;
  }
});
