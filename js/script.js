$(document).ready(function() {
        const fadeDefault = 500;

        let materialUnique = false;
        let materialType = '';
        let materialQuantity = 0;
        let materialDistribution = '';
        let materialSequence = '';

        $('#userName').focus();

        $('#ConfirmNameBtn').click(function() {
                if ($('#userName').val() != '') {
                        let userName = $('#userName').val();
                        $('#userQuestion').text(userName + ', quer criar seu fio?');

                        $('#createNecklace').fadeIn(fadeDefault);

                        moveToBottom();
                }
        });

        $('#yesCreateNecklaceBtn').click(function() {
                $('#callGrandmamma').fadeOut(fadeDefault);

                sleep();

                $('#materialsDiversity').fadeIn(fadeDefault);

                moveToBottom();
        });

        $('#noCreateNecklaceBtn').click(function() {
                $('#materialsDiversity').fadeOut(fadeDefault);

                sleep();

                $('#callGrandmamma').fadeIn(fadeDefault);

                moveToBottom();
        });

        $('#materialUniqueBtn').click(function() {
                materialUnique = true;

                $('#informMaterialQuantity').fadeOut(fadeDefault);
                $('#informMaterialQuantity').fadeIn(fadeDefault);

                moveToBottom();
        });

        $('#materialVariousBtn').click(function() {
                materialUnique = false;

                $('#informMaterialQuantity').fadeOut(fadeDefault);
                $('#informMaterialQuantity').fadeIn(fadeDefault);

                moveToBottom();
        });

        $('#confirmMaterialQuantityBtn').click(function() {
                materialQuantity = $('#materialQuantitySelect').val();

                let materialList = document.getElementById('materialSelect');

                if(materialUnique == true) {
                        $('#materialQuestion').text('Qual material que você quer usar?');

                        materialList.removeAttribute('multiple');

                } else {
                        $('#materialQuestion').text('Quais materiais que você quer usar?');

                        $('#materialSelect').css({'height': '120px'});

                        materialList.setAttribute('multiple', true);
                }

                $('#informMaterials').fadeIn(fadeDefault);

                moveToBottom();
        });

        $('#confirmMaterialBtn').click(function() {
                if(materialUnique == true) {
                        materialType = $('#materialSelect').val();

                        if(materialType == 'corals' || materialType == 'insets') {
                                $('#materialColor').fadeIn(fadeDefault);
                        } else {
                                $('#materialCharacteristic').fadeIn(fadeDefault);
                        }
                } else {
                        $('#materialsDistribution').fadeIn(fadeDefault);
                }

                moveToBottom();
        });

        $('#randomOptionBtn').click(function() {
                materialDistribution = 'random';

                if(materialType != 'corals' || materialType != 'insets') {
                        materialTypeLabel = document.getElementById('materialSelect');
                        materialTypeText = materialTypeLabel
                                .options[materialTypeLabel.selectedIndex]
                                .innerHTML;

                        $('#materialTypeQuestion')
                                .text('Qual são os tipos de ' + materialTypeText.toLowerCase() + '?')
                }

                $('#materialCharacteristic').fadeIn(fadeDefault);

                moveToBottom();
        });

        $('#orderedOptionBtn').click(function() {
                materialDistribution = 'ordered';

                if(materialType != 'corals' || materialType != 'insets') {
                        materialTypeLabel = document.getElementById('materialSelect');
                        materialTypeText = materialTypeLabel
                                .options[materialTypeLabel.selectedIndex]
                                .innerHTML;

                        $('#materialTypeQuestion')
                                .text('Qual são os tipos de ' + materialTypeText.toLowerCase() + '?')
                }

                $('#ordenation').fadeIn(fadeDefault);

                moveToBottom();
        });
});

function moveToBottom() {
        $('html,body').animate({scrollTop: document.body.scrollHeight}, 2500);
}

function sleep() {
        setTimeout(function() {}, 1000);
}
