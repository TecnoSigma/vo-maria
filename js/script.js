const fadeDefault = 500;

$(document).ready(function() {
        let materialUnique = false;
        let materialType = [];
        let materialQuantity = 0;
        let materialDistribution = '';
        let materialSequence = '';
        let materialFirstColor = '';
        let materialSecondColor = '';

        $('#userName').focus();

        $('#ConfirmNameBtn').click(function() {
                if ($('#userName').val() != '') {
                        let userName = $('#userName').val();
                        $('#userQuestion').text(userName + ', quer criar seu fio?');

                        $('#createNecklace').fadeIn(fadeDefault);

                        moveToBottom();

                        disableElement($('#userName'));
                        disableElement($(this));
                }
        });

        $('#yesCreateNecklaceBtn').click(function() {
                $('#callGrandmamma').fadeOut(fadeDefault);

                sleep();

                $('#materialsDiversity').fadeIn(fadeDefault);

                moveToBottom();

                disableElement($('#noCreateNecklaceBtn'));
                disableElement($(this));
        });

        $('#noCreateNecklaceBtn').click(function() {
                $('#materialsDiversity').fadeOut(fadeDefault);

                sleep();

                $('#callGrandmamma').fadeIn(fadeDefault);

                moveToBottom();

                disableElement($('#yesCreateNecklaceBtn'));
                disableElement($(this));
        });

        $('#materialUniqueBtn').click(function() {
                materialUnique = true;

                $('#informMaterialQuantity').fadeOut(fadeDefault);
                $('#informMaterialQuantity').fadeIn(fadeDefault);

                moveToBottom();

                disableElement($('#materialVariousBtn'));
                disableElement($(this));
        });

        $('#materialVariousBtn').click(function() {
                materialUnique = false;

                $('#informMaterialQuantity').fadeOut(fadeDefault);
                $('#informMaterialQuantity').fadeIn(fadeDefault);

                moveToBottom();

                disableElement($('#materialUniqueBtn'));
                disableElement($(this));
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

                disableElement($('#materialQuantitySelect'));
                disableElement($(this));
        });

        $('#confirmMaterialBtn').click(function() {
                if(materialUnique == true) {
                        materialType.push($('#materialSelect').val());

                        if(materialType.includes('corals') || materialType.includes('insets')) {
                                hideSecondColor();

                                $('#materialColor').fadeIn(fadeDefault);
                        } else {
                                $('#materialTypeQuestion').text('Qual é o tipo de material?');
                                if(materialType.includes('corals') || materialType.includes('insets')) {
                                        removeTransparentOption();
                                }

                                $('#materialCharacteristic').fadeIn(fadeDefault);
                        }
                } else {
                        materialType.push($('#materialSelect').val());

                        $('#materialTypeQuestion').text('Qual é o tipo de material?');

                        if(materialType.length == 1) {
                                $('#materialCharacteristic').fadeIn(fadeDefault);

                        } else {
                                $('#materialsDistribution').fadeIn(fadeDefault);
                        }
                }

                moveToBottom();

                disableElement($('#materialSelect'));
                disableElement($(this));
        });

        $('#randomOptionBtn').click(function() {
                materialDistribution = 'random';

                if(!materialType.includes('corals') || !materialType.includes('insets')) {
                        materialTypeLabel = document.getElementById('materialSelect');
                        materialTypeText = materialTypeLabel
                                .options[materialTypeLabel.selectedIndex]
                                .innerHTML;

                        $('#materialTypeQuestion')
                                .text('Quais são os tipos de ' + materialTypeText.toLowerCase() + '?')
                }

                if(materialType.includes('corals') || materialType.includes('insets')) {
                        removeTransparentOption();
                }

                $('#materialCharacteristic').fadeIn(fadeDefault);

                moveToBottom();

                disableElement($('#randomOptionBtn'));
                disableElement($(this));
        });

        $('#orderedOptionBtn').click(function() {
                materialDistribution = 'ordered';

                if(!materialType.includes('corals') || !materialType.includes('insets')) {
                        materialTypeLabel = document.getElementById('materialSelect');
                        materialTypeText = materialTypeLabel
                                .options[materialTypeLabel.selectedIndex]
                                .innerHTML;

                        $('#materialTypeQuestion')
                                .text('Quais são os tipos de ' + materialTypeText.toLowerCase() + '?')
                }

                addSequenceOption(materialQuantity);

                $('#ordenation').fadeIn(fadeDefault);

                moveToBottom();

                disableElement($('#orderedOptionBtn'));
                disableElement($(this));
        });

        $('#confirmSequenceBtn').click(function() {
                materialSequence = $('#sequenceSelect').val();

                if(materialType.includes('corals') || materialType.includes('insets')) {
                        removeTransparentOption();
                }

                $('#materialCharacteristic').fadeIn(fadeDefault);

                moveToBottom();

                disableElement($('#sequenceSelect'));
                disableElement($(this));
        });

        $('#confirmMaterialTypeBtn').click(function() {
                if($('#characteristicMaterialSelect').val() == 'liso') {
                        hideSecondColor();
                }

                $('#materialColor').fadeIn(fadeDefault);

                moveToBottom();

                disableElement($('#characteristicMaterialSelect'));
                disableElement($(this));
        });

        $('#confirmMaterialColorBtn').click(function() {
                materialFirstColor = $('#firstColor').val();
                materialSecondColor = $('#secondColor').val();

                $('#seeNecklace').fadeIn(fadeDefault);

                moveToBottom();

                disableElement($(this));
        });

        $('#noSeeNecklanceBtn').click(function() {
                $('#startAgain').fadeIn(fadeDefault);

                moveToBottom();

                disableElement($('#yesSeeNecklanceBtn'));
                disableElement($(this));
        });

        $('#yesSeeNecklanceBtn').click(function() {
                $('#necklaceImage').fadeIn(fadeDefault);

                moveToBottom();

                disableElement($('#noSeeNecklanceBtn'));
                disableElement($(this));
        });

        $('#finishedBtn').click(function() {
                $('#callGrandmamma').fadeIn(fadeDefault);

                moveToBottom();
        });

        $('#noStartAgainBtn').click(function() {
                $('#callGrandmamma').fadeIn(fadeDefault);

                moveToBottom();

                disableElement($('#yesStartAgainBtn'));
                disableElement($(this));
        });

        $('#createOtherNecklanceBtn').click(function() {
                restart();
        });

        $('#yesStartAgainBtn').click(function() {
                restart();
        });

        $('#materialSelect').change(function() {
                var selectedImage = $(this).val();

                $('#materialImages').empty();

                if (selectedImage) {
                        AddMaterialImages(selectedImage);
                }
        });
});

function moveToBottom() {
        $('html,body').animate({scrollTop: document.body.scrollHeight}, 2500);
}

function sleep() {
        setTimeout(function() {}, 1000);
}

function disableElement(element) {
        element.attr('disabled', 'disabled');
}

function restart() {
        $('#sayYourName').fadeOut(fadeDefault);
        $('#createNecklace').fadeOut(fadeDefault);
        $('#materialsDiversity').fadeOut(fadeDefault);
        $('#informMaterialQuantity').fadeOut(fadeDefault);
        $('#informMaterials').fadeOut(fadeDefault);
        $('#materialsDistribution').fadeOut(fadeDefault);
        $('#ordenation').fadeOut(fadeDefault);
        $('#materialCharacteristic').fadeOut(fadeDefault);
        $('#materialColor').fadeOut(fadeDefault);
        $('#seeNecklace').fadeOut(fadeDefault);
        $('#necklaceImage').fadeOut(fadeDefault);
        $('#startAgain').fadeOut(fadeDefault);
        $('#callGrandmamma').fadeOut(fadeDefault);

        sleep();

        $('button').each(function() { $(this).prop('disabled', false); });
        $('select').each(function() { $(this).prop('disabled', false); });

        addTransparentOption();

        $('#firstColorInput').val('#000000');
        $('#secondColorInput').val('#000000');

        showSecondColor();

        $('#sayYourName').fadeIn(fadeDefault);
}

function removeTransparentOption() {
        const select = document.getElementById("characteristicMaterialSelect");
        const valueToRemove = "transparente";

        for (let i = 0; i < select.options.length; i++) {
                if (select.options[i].value === valueToRemove) {
                        select.remove(i);
                        break;
                }
         }
}

function addTransparentOption() {
        const select = document.getElementById("characteristicMaterialSelect");
        const newOption = document.createElement("option");
        newOption.value = "transparente";
        newOption.text = "Transparente";

        select.appendChild(newOption);
}

function addSequenceOption(materialQuantity) {
        quantity = parseInt(materialQuantity) / 2;

        const select = document.getElementById("sequenceSelect");

        for (let i = quantity; i >= 1; i--) {
                const newOption = document.createElement("option");
                newOption.value = i;
                newOption.text = i;

                select.appendChild(newOption);
        }
}

function hideSecondColor() {
        $('#secondColorLabel').hide();
        $('#secondColorInput').hide();
}

function showSecondColor() {
        $('#secondColorLabel').show();
        $('#secondColorInput').show();
}

function AddMaterialImages(folder) {
        let div = document.getElementById('materialImages');

        imagesList(folder).forEach(function(image) {
                let img = document.createElement('img');

                img.src = image;
                //img.alt = materialType;

                div.appendChild(img);
        });
}

function imagesList (folder) {
        if (folder == 'insets') {
                return ["/images/templates/insets/bola-aramada.svg",
                        "/images/templates/insets/luxo.svg",
                        "/images/templates/insets/oval-aramado.svg",
                        "/images/templates/insets/strass.svg"]
        }

        if (folder == 'beads') {
                return ["/images/templates/beads/canjicao-cristal.svg",
                        "/images/templates/beads/canjicao.svg",
                        "/images/templates/beads/micanguinha.svg",
                        "/images/templates/beads/rajadao.svg",
                        "/images/templates/beads/rajado.svg"]
        }

        if (folder == 'muranos') {
        return ["/images/templates/muranos/azeitona-cristal-rajada.svg",
                "/images/templates/muranos/azeitona-cristal.svg",
                "/images/templates/muranos/azeitona-rajada.svg",
                "/images/templates/muranos/azeitona.svg",
                "/images/templates/muranos/bola-cristal-rajada.svg",
                "/images/templates/muranos/bola-cristal.svg",
                "/images/templates/muranos/bola-rajada.svg",
                "/images/templates/muranos/bola.svg",
                "/images/templates/muranos/cartola.svg",
                "/images/templates/muranos/caveira-cristal.svg",
                "/images/templates/muranos/caveira.svg",
                "/images/templates/muranos/coracao-cristal-rajado.svg",
                "/images/templates/muranos/coracao-cristal.svg",
                "/images/templates/muranos/coracao-rajado.svg",
                "/images/templates/muranos/coracao.svg",
                "/images/templates/muranos/dado-cristal.svg",
                "/images/templates/muranos/dado.svg",
                "/images/templates/muranos/firma-cortada-rajada.svg",
                "/images/templates/muranos/firma-cortada.svg",
                "/images/templates/muranos/firma-cristal-cortada-rajada.svg",
                "/images/templates/muranos/firma-cristal-cortada.svg",
                "/images/templates/muranos/firma-cristal-rajada.svg",
                "/images/templates/muranos/firma-cristal.svg",
                "/images/templates/muranos/firma-cristal-torcida-rajada.svg",
                "/images/templates/muranos/firma-cristal-torcida.svg",
                "/images/templates/muranos/firma-rajada.svg",
                "/images/templates/muranos/firma.svg",
                "/images/templates/muranos/firma-torcida-rajada.svg",
                "/images/templates/muranos/firma-torcida.svg",
                "/images/templates/muranos/meteoro-cristal-rajado.svg",
                "/images/templates/muranos/meteoro-cristal.svg",
                "/images/templates/muranos/meteoro-rajado.svg",
                "/images/templates/muranos/meteoro.svg",
                "/images/templates/muranos/peixe-cristal-rajado.svg",
                "/images/templates/muranos/peixe-cristal.svg",
                "/images/templates/muranos/peixe-rajado.svg",
                "/images/templates/muranos/peixe.svg",
                "/images/templates/muranos/pitanga-cristal-rajada.svg",
                "/images/templates/muranos/pitanga-cristal.svg",
                "/images/templates/muranos/pitanga-rajada.svg",
                "/images/templates/muranos/pitanga.svg",
                "/images/templates/muranos/rosa-cristal-rajada.svg",
                "/images/templates/muranos/rosa-cristal.svg",
                "/images/templates/muranos/rosa-rajada.svg",
                "/images/templates/muranos/rosa.svg",
                "/images/templates/muranos/sextavado-cristal-rajado.svg",
                "/images/templates/muranos/sextavado-cristal.svg",
                "/images/templates/muranos/sextavado-rajado.svg",
                "/images/templates/muranos/sextavado.svg"]
        }
}
