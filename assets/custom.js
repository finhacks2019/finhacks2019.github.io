$(function() {
   var base_url = 'https://finhacks.id/';

   $('#addEducation').click(function() {
      var education = $('#education').val();
      var university = $('#university').val();
      var major = $('#major').val();
      var graduation_year = $('#graduation_year').val();
      if(education == ''){
         $('#error_education').html('Harap pilih Pendidikan Anda');
      }

      if(university == ''){
         $('#error_university').html('Universitas harus diisi');
      }

      if(major == ''){
         $('#error_major').html('Jurusan harus diisi');
      }

      if(graduation_year == ''){
         $('#error_graduation_year').html('Tahun Kelulusan harus diisi');
      }

      if(education != '' && university != '' && major != '' && graduation_year != ''){
         var field = generateField();
         var html = '<div class="col-12 education-summary education-div" id="div_education_'+field+'"><div id="div_sub_education_'+field+'"><p>Pendidikan '+education+'</p><p>'+university+'</p><p>Jurusan '+major+'</p><p>Tahun Kelulusan '+graduation_year+'</p><a class="btn btn-edit btn-education-confirm" data-field="'+field+'"><i class="fa fa-trash"/></a>' +
                    '<input type="hidden" name="education[]" value="'+education+'"><input type="hidden" name="university[]" value="'+university+'"><input type="hidden" name="major[]" value="'+major+'"><input type="hidden" name="graduation_year[]" value="'+graduation_year+'"></div>' + 
                    '<div class="hidden" id="div_education_confirm_'+field+'">Are you sure want to delete this Education? <button type="button" class="btn btn-danger btn-remove-education" data-field="'+field+'">Delete</button> <button type="button" class="btn btn-secondary btn-education-cancel" data-field="'+field+'">Cancel</button></div></div>';
         $('#div_education').append(html);

         $('#error_add_education').html('');

         $("#education").prop("selectedIndex", 0);
         $('#university').val('');
         $('#major').val('');
         $('#graduation_year').val('');
         $('#form_education').hide();

         var total = $('.education-div').length;
         if(total == 3){
            $('#btnAddEducation').hide();
         }else{
            $('#btnAddEducation').show();
         }
      }
   });

   $('#btnAddEducation').click(function(){
      var total = $('.education-div').length;
      resetEducation();
      if(total > 0){
         $('#btnAddEducation').hide();
         $('#cancelEducation').removeClass('hidden');
         $('#form_education').show();
      }
   });

   $('#cancelEducation').click(function(){
      $('#form_education').hide();
      $('#btnAddEducation').show();
   });

   $('#addOccupation').click(function() {
      var job_title = $('#job_title').val();
      var company = $('#company').val();
      var start_year = $('#start_year').val();
      var end_year = $('#end_year').val();
      if(job_title == ''){
         $('#error_job_title').html('Jabatan harus diisi');
      }

      if(company == ''){
         $('#error_company').html('Perusahaan harus diisi');
      }

      if(start_year == ''){
         $('#error_start_year').html('Tahun Mulai harus diisi');
      }

      if(end_year == ''){
         $('#error_end_year').html('Tahun Selesai harus diisi');
      }

      if(job_title != '' && company != '' && start_year != '' && end_year != ''){
         var field = generateField();
         var html = '<div class="col-12 education-summary occupation-div" id="div_occupation_'+field+'"><div id="div_sub_occupation_'+field+'"><p>Jabatan '+job_title+'</p><p>'+company+'</p><p>Dari '+start_year+' sampai '+end_year+'</p><a class="btn btn-edit btn-occupation-confirm" data-field="'+field+'"><i class="fa fa-trash"/></a>' +
                    '<input type="hidden" name="job_title[]" value="'+job_title+'"><input type="hidden" name="company[]" value="'+company+'"><input type="hidden" name="start_year[]" value="'+start_year+'"><input type="hidden" name="end_year[]" value="'+end_year+'"></div>' +
                    '<div class="hidden" id="div_occupation_confirm_'+field+'">Are you sure want to delete this Occupation? <button type="button" class="btn btn-danger btn-remove-occupation" data-field="'+field+'">Delete</button> <button type="button" class="btn btn-secondary btn-occupation-cancel" data-field="'+field+'">Cancel</button></div></div>';
         $('#div_occupation').append(html);

         $('#error_add_occupation').html('');

         $('#job_title').val('');
         $('#company').val('');
         $("#start_year").prop("selectedIndex", 0);
         $("#end_year").prop("selectedIndex", 0);
         $('#form_occupation').hide();

         var total = $('.occupation-div').length;
         if(total == 3){
            $('#btnAddOccupation').hide();
         }else{
            $('#btnAddOccupation').show();
         }
      }
   });

   $('#btnAddOccupation').click(function(){
      var total = $('.occupation-div').length;
      resetOccupation();
      if(total > 0){
         $('#btnAddOccupation').hide();
         $('#cancelOccupation').removeClass('hidden');
         $('#form_occupation').show();
      }
   });

   $('#cancelOccupation').click(function(){
      $('#form_occupation').hide();
      $('#btnAddOccupation').show();
   });

   $('#education').on('change', function() {
      if(this.value != ''){
         $('#error_education').html('');
      }
   });

   $('#university').on('keyup', function(){
      if(this.value != ''){
         $('#error_university').html('');
      }
   });

   $('#major').on('keyup', function(){
      if(this.value != ''){
         $('#error_major').html('');
      }
   });

   $('#graduation_year').on('keyup', function(){
      if(this.value != ''){
         $('#error_graduation_year').html('');
      }
   });

   $('#job_title').on('keyup', function(){
      if(this.value != ''){
         $('#error_job_title').html('');
      }
   });

   $('#company').on('keyup', function(){
      if(this.value != ''){
         $('#error_company').html('');
      }
   });

   $('#start_year').on('change', function() {
      if(this.value != ''){
         $('#error_start_year').html('');
      }
   });

   $('#end_year').on('change', function() {
      if(this.value != ''){
         $('#error_end_year').html('');
      }
   });

   $(document).on('click', '.btn-remove-education', function (e) {
      e.preventDefault();
      var field = $(this).attr('data-field');
      $(this).closest('#div_education_' + field).hide(0, function () {
          $(this).remove();
          var total = $('.education-div').length;
            if(total == 0){
               resetEducation();
               $('#btnAddEducation').hide();
               $('#cancelEducation').addClass('hidden');
               $('#form_education').show();
            }else{
               $('#form_education').hide();
               $('#btnAddEducation').show();
            }
      });
   });
   
   $(document).on('click', '.btn-education-confirm', function (e) {
      var field = $(this).attr('data-field');
      $('#div_sub_education_'+field).addClass('hidden');
      $('#div_education_confirm_'+field).removeClass('hidden');
   });

   $(document).on('click', '.btn-education-cancel', function (e) {
      var field = $(this).attr('data-field');
      $('#div_education_confirm_'+field).addClass('hidden');
      $('#div_sub_education_'+field).removeClass('hidden');
   });
   
   $(document).on('click', '.btn-remove-occupation', function (e) {
      e.preventDefault();
      var field = $(this).attr('data-field');
      $(this).closest('#div_occupation_' + field).hide(1, function () {
          $(this).remove();
          var total = $('.occupation-div').length;
            if(total == 0){
               resetOccupation();
               $('#btnAddOccupation').hide();
               $('#cancelOccupation').addClass('hidden');
               $('#form_occupation').show();
            }else{
               $('#form_occupation').hide();
               $('#btnAddOccupation').show();
            }
      });
   });

   $(document).on('click', '.btn-occupation-confirm', function (e) {
      var field = $(this).attr('data-field');
      $('#div_sub_occupation_'+field).addClass('hidden');
      $('#div_occupation_confirm_'+field).removeClass('hidden');
   });

   $(document).on('click', '.btn-occupation-cancel', function (e) {
      var field = $(this).attr('data-field');
      $('#div_occupation_confirm_'+field).addClass('hidden');
      $('#div_sub_occupation_'+field).removeClass('hidden');
   });

   if($("#team_name").val() == ""){
      $("#team_name").removeAttr('disabled');
      $("#changeButtonTeamName").html("Simpan");
   } else {
      $("#team_name").attr('disabled','disabled');
      $("#changeButtonTeamName").html("Ubah");
   }


   $('#buttonUbahTeam').on('click', function() {
      $("#team_name").removeAttr('disabled');
      $("#check_individu").removeAttr('disabled');
      $("#buttonUbahTeam").attr("style", "display : none");
      $("#buttonSubmitTeam").removeAttr("style");
   });

   $("#team_name").on('input', function() {
      var team_id = "";
      if($("#team_id").val() != ""){
         team_id = $("#team_id").val();
      }

      $.ajax({
         type: 'GET',
         url: $("#base_url").val()+'do/team/cek_team_exist',
         data: 'data='+event.target.value+'&team_id='+team_id,
         cache: 'false',
         success: function(response){
            if(response == 'false'){
               $("#alert_team_name").attr("class", "error");
               $('#alert_team_name').html('Nama team sudah di pakai.');
               $("#team_name").val('');
            }else{
               $('#alert_team_name').html('');
               $("#alert_team_name").removeAttr("class");
            }
         }
      });
   });

   $("#file_Upload").on('input', function() {
      var ext = this.value.split(".");
      ext = ext[ext.length-1].toLowerCase();      
      var arrayExtensions = ["pdf" , "pptx"];
   
      if (arrayExtensions.lastIndexOf(ext) == -1) {
         return false;
      }else{
         $("#buttonSubmitSubmission").attr('disabled','disabled');
         $("#file_Upload").attr('disabled','disabled');
         $("p[id=filename]").html('');
         document.getElementById("progress-bar").style.width = "";
         document.getElementById("status").innerHTML = "";
         var file = document.getElementById("file_Upload").files[0];
         var formdata = new FormData();
         formdata.append("file_Upload", file);
         formdata.append("csrf_token", $('input[name=csrf_token]').val());
         var ajax = new XMLHttpRequest();
         ajax.upload.addEventListener("progress", progressUpload, false);
         ajax.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
               var data = JSON.parse(this.responseText);
               $('input[name=csrf_token]').val(data.token);
               $("#buttonSubmitSubmission").removeAttr('disabled');
               $("p[id=filename]").html(data.nama_lama + ' <i class="fa fa-check"></i>');
               $("p[id=filename]").attr("style", "color: #9a9a9a;");
               $("#nama_file").val(data.nama_lama);
               $("#alert_file_submission").html("");
               if(data.status_code == 500){
                  document.getElementById("progress-bar").style.width = "";
                  document.getElementById("status").innerHTML = "";
                  $("p[id=filename]").html("");
               }
            }
            $("#file_Upload").removeAttr('disabled');
         };
         ajax.open("POST", $("#base_url").val()+'do/submission/upload', true);
         ajax.send(formdata);
      }
   });

   $("form[name='formRegister']").validate({
      rules: {
         fullname: 'required',
         ktp: 'required',
         birth_place: 'required',
         birth_date: 'required',
         gender: 'required',
         nationality: 'required',
         address: 'required',
         phone_number: 'required',
         password: 'required',
         confirm_password: {
            required: true,
            equalTo: "#password"
         },
         terms: 'required'
      },
      messages: {
         fullname: 'Nama Lengkap harus diisi',
         ktp: 'Nomor Identitas harus diisi',
         birth_place: 'Tempat Kelahiran harus diisi',
         birth_date: 'Tanggal Lahir harus diisi',
         gender: 'Jenis Kelamin harus diisi',
         nationality: 'Kewarganegaraan harus diisi',
         address: 'Alamat harus diisi',
         phone_number: 'No. Handphone harus diisi',
         password: 'Password harus diisi',
         confirm_password: {
            required: 'Konfirmasi Password harus diisi',
            equalTo: 'Konfirmasi Password tidak sesuai'
         },
         terms: 'Anda harus menyetujui'
      },
      submitHandler: function(form) {
          form.submit();
      }
   });

   $("form[name='teamForm']").validate({
      rules: {
         team_name: 'required'
      },
      messages: {
         team_name: 'Nama Team harus diisi'
      },
      submitHandler: function(form) {
         form.submit();
      }
   });

   $("form[name='formSubmission']").validate({
      rules: {
         categorySub: 'required',
         judulLomba: 'required',
         descSubmission: 'required',
         acceptSubmission: 'required'
      },
      messages: {
         categorySub: 'Kategori harus dipilih',
         judulLomba: 'Judul Ide harus diisi',
         descSubmission: 'Deskripsi Project harus diisi',
         acceptSubmission: 'Ini harus dicentang'
      },
      submitHandler: function(form) {
         form.submit();
      }
   });


   $("form[name='formSubmission'] #buttonSubmitSubmission").click(function (e) {
      e.preventDefault();
      if($("form[name='formSubmission']").valid() && $("#file_Upload").val() != "") {
         $('#buttonSubmitSubmission').prop("disabled", true);
         $("form[name='formSubmission']").submit();
         $("#alert_file_submission").html("");
      } else if($("#file_Upload").val() == "") {
         $("#alert_file_submission").html("Upload file harus di isi");
      }
   });

   $("form[name='formContactus']").validate({
      rules: {
         fullname: 'required',
         email: 'required',
         phone: 'required',
         subject: 'required',
         message: 'required'
      },
      messages: {
         fullname: 'Nama Lengkap harus diisi',
         email: 'Alamat Email harus diisi',
         phone: 'No. Handphone harus diisi',
         subject: 'Topik harus diisi',
         message: 'Pesan harus diisi'
      },
      submitHandler: function(form) {
         form.submit();
      }
   });

   $("form[name='formRoadshowRegistration']").validate({
      rules: {
         fullname: 'required',
         ktp: 'required',
         phone_number: 'required',
         email: 'required',
         location: 'required',
         type: 'required'
      },
      messages: {
         fullname: 'Nama Lengkap harus diisi',
         ktp: 'Nomor Identitas harus diisi',
         phone_number: 'No. Handphone harus diisi',
         email: 'Alamat Email harus diisi',
         location: 'Lokasi Roadshow harus diisi',
         type: 'Sesi Roadshow harus diisi'
      },
      submitHandler: function(form) {
         form.submit();
      }
   });

   $('#phone_number').on('keyup', function(){
      var str = $(this).val();
      var res = str.slice(0,3);
      if(res != '+62'){
         $(this).val('+62');
      }
   });

   $("form[name='formRegister'] #btnRegister").click(function (e) {
      e.preventDefault();
      var education = $('#education').val();
      var university = $('#university').val();
      var major = $('#major').val();
      var graduation_year = $('#graduation_year').val();
      var job_title = $('#job_title').val();
      var company = $('#company').val();
      var start_year = $('#start_year').val();
      var end_year = $('#end_year').val();
      var total_education = $('input[name="education[]"]').length;
      var email_regis = $("#email_register").val();
      var check_email = cek_email_valid(email_regis);

      if(check_email == false){
         $("#email_register").addClass("error");
      }

      if(total_education == 0){
         $('#error_add_education').html('Harap mengisi satu pendidikan.');
      }

      if(education != '' && university != '' && major != '' && graduation_year != ''){
         $('#error_add_education').html('Anda belum menambah informasi pendidikan. Mohon klik pendidikan baru terlebih dahulu.');
      }

      if(job_title != '' && company != '' && start_year != '' && end_year != ''){
         $('#error_add_occupation').html('Anda belum menambah informasi pekerjaan. Mohon klik posisi baru terlebih dahulu.');
      }

      if($("form[name='formRegister']").valid() && total_education > 0 && check_email == true) {
         $('#btnRegister').prop("disabled", true);
         $("form[name='formRegister']").submit();
      }
   });

   $("form[name='formRoadshowRegistration']").on("submit", function () {
      if($("form[name='formRoadshowRegistration']").valid()) {
         $('#btnRegister').prop("disabled", true);
      }
   });

   $("form[name='formContactus']").on("submit", function () {
      if($("form[name='formContactus']").valid()) {
         $('#btnSend').prop("disabled", true);
      }
   });

   $('#start_year').change(function(){
      var start_year = this.value;
      var end_year = $('#end_year').val();
      if(start_year > end_year){
         $("#end_year").prop("selectedIndex", 0);
      }
      $('#end_year > option').each(function() {
         var option_value = $(this).val();
         if(start_year > option_value && option_value != ''){
            $("#end_year option[value='"+ option_value + "']").attr('disabled', true);
         }else{
            $("#end_year option[value='"+ option_value + "']").removeAttr('disabled');
         }
     });
   });

   $('#email_register').blur(function() {
      var email = $(this).val();
      var mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	   if(email.match(mailformat) != null){
         $.ajax({
            type: 'GET',
            url: base_url+'do/check/email',
            data: 'email='+email,
            datatype: 'json',
            beforeSend: function() {
               $('#div_spinner').addClass('spinner');
            },
            success: function(response){
               setTimeout(function(){
                  $('#div_spinner').removeClass('spinner');
                  if(response == 'false'){
                     $('#email_alert').html('Alamat Email sudah terdaftar.');
                     $('#email_register').val('');
                  }else{
                     $('#email_alert').html('');
                  }
               }, 1000);
            }
         });
      } else if(email != ""){
         $("#email_register").addClass("error");
         $("#email_alert").html("Alamat Email Tidak Valid");
      } else {
         $("#email_alert").html("Alamat Email Harus Diisi");
      }
   });

   $('#email_register').focus(function() {
      $('#email_alert').html('');
   });

   $("form[name='formParticipant']").validate({
      rules: {
         fullname: 'required',
         ktp: 'required',
         birth_place: 'required',
         birth_date: 'required',
         gender: 'required',
         nationality: 'required',
         address: 'required',
         phone_number: 'required',
         terms: 'required'
      },
      messages: {
         fullname: 'Nama Lengkap harus diisi',
         ktp: 'Nomor Identitas harus diisi',
         birth_place: 'Tempat Kelahiran harus diisi',
         birth_date: 'Tanggal Lahir harus diisi',
         gender: 'Jenis Kelamin harus diisi',
         nationality: 'Kewarganegaraan harus diisi',
         address: 'Alamat harus diisi',
         phone_number: 'No. Handphone harus diisi',
         terms: 'Anda harus menyetujui'
      },
      submitHandler: function(form) {
          form.submit();
      }
   });

   $("form[name='formParticipant'] #btnSubmit").click(function (e) {
      e.preventDefault();
      var education = $('#education').val();
      var university = $('#university').val();
      var major = $('#major').val();
      var graduation_year = $('#graduation_year').val();
      var job_title = $('#job_title').val();
      var company = $('#company').val();
      var start_year = $('#start_year').val();
      var end_year = $('#end_year').val();
      var total_education = $('input[name="education[]"]').length;

      if(total_education == 0){
         $('#error_add_education').html('Harap mengisi satu pendidikan.');
      }

      if(education != '' && university != '' && major != '' && graduation_year != ''){
         $('#error_add_education').html('Anda belum menambah informasi pendidikan. Mohon klik pendidikan baru terlebih dahulu.');
      }

      if(job_title != '' && company != '' && start_year != '' && end_year != ''){
         $('#error_add_occupation').html('Anda belum menambah informasi pekerjaan. Mohon klik posisi baru terlebih dahulu.');
      }

      if($("form[name='formParticipant']").valid() && total_education > 0) {
         $('#btnSubmit').prop("disabled", true);
         $("form[name='formParticipant']").submit();
      }
   });

   $("form[name='formInviteTeam']").validate({
      rules: {
         email: {
            required : true,
            email : true
         }
      },
      messages: {
         email: {
            required : 'Alamat Email harus diisi',
            email : 'Alamat Email Tidak Valid'
         }
      },
      submitHandler: function(form) {
          form.submit();
      }
   });

   $("form[name='formInviteTeam'] #btnSend").click(function (e) {
      e.preventDefault();

      if($("form[name='formInviteTeam']").valid()) {
         var email = $('#email_invitation').val();
         $.ajax({
            type: 'GET',
            url: base_url+'do/check/email/team',
            data: 'email='+email,
            datatype: 'json',
            beforeSend: function() {
               $('#divBtnSend').hide();
               $('#divLoadingSend').addClass('spinner');
               $('#divLoadingSend').show();
               $('#error_email_invitation').removeClass('error');
               $('#error_email_invitation').html('');
            },
            success: function(response){
               setTimeout(function(){
                  var obj = JSON.parse(response);
                  if(obj.status == 'failed'){
                     $('#error_email_invitation').addClass('error');
                     $('#error_email_invitation').html(obj.message);
                     $('#divLoadingSend').removeClass('spinner');
                     $('#divLoadingSend').hide();
                     $('#divBtnSend').show();
                  }else{
                     $("form[name='formInviteTeam']").submit();
                  }
               }, 1000);
            }
         });
      }
   });

   $('#btnEditProfile').click(function(){
      location.href = base_url+'competition/profile/edit';
   });

   $('#btnUbahPassword').click(function(){
      var formChangePassword = $("form[name='formChangePassword']").validate();
      formChangePassword.resetForm();
      $("form[name='formChangePassword']").find('.error').removeClass("error");
      $('#cp_old_password').val('');
      $('#cp_password').val('');
      $('#cp_new_password').val('');
      $('#alert_cp').html('');
      $('#changePasswordModal').modal('show');
   });

   $("form[name='formChangePassword']").validate({
      rules: {
         old_password: 'required',
         password: 'required',
         confirm_password: {
            required: true,
            equalTo: "#cp_password"
         }
      },
      messages: {
         old_password: 'Password Lama harus diisi',
         password: 'Password harus diisi',
         confirm_password: {
            required: 'Konfirmasi Password harus diisi',
            equalTo: 'Konfirmasi Password tidak sesuai'
         }
      },
      submitHandler: function(form) {
          form.submit();
      }
   });

   $("form[name='formChangePassword'] #btnChangePassword").click(function (e) {
      e.preventDefault();
      if($("form[name='formChangePassword']").valid()) {
         $.ajax({
            type: 'POST',
            url: base_url+'do/check-password',
            data: $("form[name='formChangePassword']").serialize(),
            datatype: 'json',
            beforeSend: function() {
               $('#alert_cp').html('');
               $('#alert_cp').removeClass('error');
               $('#alert_cp').addClass('spinner');
            },
            success: function(response){
               setTimeout(function(){
                  var obj = JSON.parse(response);
                  $('input[name=csrf_token]').val(obj.token);
                  $('#alert_cp').removeClass('spinner');
                  if(obj.status === true){
                     $('#btnChangePassword').prop("disabled", true);
                     $("form[name='formChangePassword']").submit();
                  }else{
                     $('#alert_cp').addClass('error');
                     $('#alert_cp').html(obj.message);
                  }
               }, 1000);
            }
         });
      }
   });

   $("#categorySub").change(function(){
      var obj = JSON.parse($("#dataSubmission").val());
      var exist = "";
      obj.forEach(element => {
         if($(this).val() == element.idea){
            exist = element.document_id;
         }
      });
      $("#documentID").val(exist);
   });

   $('#formLogin').submit(function(event) {
      event.preventDefault();
      $.ajax({
         type: 'POST',
         url: base_url+'do/login',
         data: $('#formLogin').serialize(),
         datatype: 'json',
         beforeSend: function() {
            $('#alert_login').html('');
            $('#alert_login').removeClass('error');
            $('#alert_login').addClass('spinner');
         },
         success: function(response){
            setTimeout(function(){
               var obj = JSON.parse(response);
               $('input[name=csrf_token]').val(obj.token);
               $('#alert_login').removeClass('spinner');
               if(obj.status === true){
                  $('#alert_login').html('');
                  window.location.href = base_url+'competition';
               }else{
                  $('#alert_login').addClass('error');
                  $('#alert_login').html(obj.message);
               }
            }, 1000);
         }
      });
   });

   $('#btnLupaPassword').click(function() {
      $.ajax({
         type: 'POST',
         url: base_url+'do/lupapassword',
         data: $('#formLupaPassword').serialize(),
         datatype: 'json',
         beforeSend: function() {
            $('#alert_lupa_password').html('');
            $('#alert_lupa_password').removeClass('error');
            $('#alert_lupa_password').addClass('spinner');
         },
         success: function(response){
            setTimeout(function(){
               var obj = JSON.parse(response);
               $('input[name=csrf_token]').val(obj.token);
               $('#alert_lupa_password').removeClass('spinner');
               if(obj.status === true){
                  $("#loginModal").modal('hide');
                  $('#successModal').modal('show');
                  $('#success_message').html("Password baru telah dikirim ke email");
               }else{
                  $('#alert_lupa_password').addClass('error');
                  $('#alert_lupa_password').html(obj.message);
               }
            }, 1000);
         }
      });
   });
   
	// $('#userPass').on('keypress',function(e) {
	// 	if(e.which == 13) {
	// 		$.ajax({
	// 			 type: 'POST',
	// 			 url: base_url+'do/login',
	// 			 data: $('#formLogin').serialize(),
	// 			 datatype: 'json',
	// 			 beforeSend: function() {
	// 				$('#alert_login').html('');
	// 				$('#alert_login').removeClass('error');
	// 				$('#alert_login').addClass('spinner');
	// 			 },
	// 			 success: function(response){
	// 				setTimeout(function(){
	// 				   var obj = JSON.parse(response);
	// 				   $('input[name=csrf_token]').val(obj.token);
	// 				   $('#alert_login').removeClass('spinner');
	// 				   if(obj.status === true){
	// 					  $('#alert_login').html('');
	// 					  window.location.href = base_url+'competition';
	// 				   }else{
	// 					  $('#alert_login').addClass('error');
	// 					  $('#alert_login').html(obj.message);
	// 				   }
	// 				}, 1000);
	// 			 }
	// 		  });
	// 	}
	// });

});

function numberOnly(event){
   var charCode = (event.which) ? event.which : event.keyCode
   if (charCode > 31 && (charCode < 44 || (charCode > 44 && charCode <48) || charCode > 57)){
      return false;
   }

   return true;
}

function generateField(){
   return Math.floor(Math.random() * (100000 - 1 + 1) + 57);
}

function progressUpload(event){
   var percent = (event.loaded / event.total) * 100;
   document.getElementById("progress-bar").style.width = Math.round(percent)+'%';
   document.getElementById("status").innerHTML = Math.round(percent)+"%";
   if(event.loaded==event.total){

   }
}

function fillImageModal(id){
   $("#imageSrcModal").attr("src", id);
}

function actionFunction(type, divID, id, text = ""){
   if(type == "delete"){
      $("#deleteSub"+divID).removeAttr("style");
      $("#showSub"+divID).attr("style", "display : none");
      $("#message_delete"+divID).html("Apakah Anda yakin ingin mengahapus "+text+ " ?");
      $("#id_data"+divID).val(id);
   } else if(type == "cancel"){
      $("#showSub"+divID).removeAttr("style");
      $("#deleteSub"+divID).attr("style", "display : none");
   }
}

function lupaPasswordDiv(){
   $("#loginDiv").attr("style", "display : none");
   $("#lupaPassDiv").removeAttr("style");
   $("#modalLoginTitle").html("Lupa Password");
   $("#alert_login").html("");
   $("#alert_lupa_password").html("");
}

function loginDiv(){
   $("#lupaPassDiv").attr("style", "display : none");
   $("#loginDiv").removeAttr("style");
   $("#modalLoginTitle").html("Login");
   $("#alert_login").html("");
   $("#alert_lupa_password").html("");
}

function resetEducation(){
   $("#education").prop("selectedIndex", 0);
   $('#university').val('');
   $('#major').val('');
   $('#graduation_year').val('');
   $('#error_education').html('');
   $('#error_university').html('');
   $('#error_major').html('');
   $('#error_graduation_year').html('');
}

function resetOccupation(){
   $('#job_title').val('');
   $('#company').val('');
   $("#start_year").prop("selectedIndex", 0);
   $("#end_year").prop("selectedIndex", 0);
   $('#error_job_title').html('');
   $('#error_company').html('');
   $('#error_start_year').html('');
   $('#error_end_year').html('');
}

function cek_email_valid(email){
   var mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   if(email != "" && email.match(mailformat) != null){
      return true;
   } else {
      return false;
   }
}

function validate(file) {
   var ext = file.split(".");
   ext = ext[ext.length-1].toLowerCase();      
   var arrayExtensions = ["pdf" , "pptx"];

   if (arrayExtensions.lastIndexOf(ext) == -1) {
       $("#file_Upload").val("");
       return false;
   }
}
