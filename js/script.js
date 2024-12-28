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
        svgStringsList(folder).forEach(function(svgString) {
                const svgBase64 = btoa(unescape(encodeURIComponent(svgString))); // Base64 encode
                const svgDataUrl = `data:image/svg+xml;base64,${svgBase64}`;
                const imgElement = $('<img>').attr('src', svgDataUrl).attr('alt', 'Teste');

                $('#materialImages').append(imgElement);

                imgElement.on('load', () => { URL.revokeObjectURL(svgUrl); });
        });
}

function svgStringsList (folder) {
        if(folder == 'insets') {
                return [bolaAramada(), luxo(), ovalAramado(), strass()];
        }

        if(folder == 'corals') {
                return [coral()];
        }

        if(folder == 'beads') {
                return [canjicaoCristal(), canjicao(), micanguinha(), rajadao(), rajado()];
        }

        if(folder == 'muranos') {
                return [azeitonaCristalRajada(), azeitonaCristal(), azeitonaRajada(), azeitona(), bolaCristalRajada(), bolaCristal(), bolaRajada(), bola(), cartola(), caveiraCristal(), caveira(), coracaoCristalRajado(), coracaoCristal(), coracaoRajado(), coracao(), dadoCristal(), dado(), firmaCortadaRajada(), firmaCortada(), firmaCristalCortadaRajada(), firmaCristalCortada(), firmaCristalRajada(), firmaCristal(), firmaCristalTorcidaRajada(), firmaCristalTorcida(), firmaRajada(), firma(), firmaTorcidaRajada(), firmaTorcida(), meteoroCristalRajado(), meteoroCristal(), meteoroRajado(), meteoro(), peixeCristalRajado(), peixeCristal(), peixeRajado(), peixe(), pitangaCristalRajada(), pitangaCristal(), pitangaRajada(), pitanga(), rosaCristalRajada(), rosaCristal(), rosaRajada(), rosa(), sextavadoCristalRajado(), sextavadoCristal(), sextavadoRajado(), sextavado()];
        }
}
