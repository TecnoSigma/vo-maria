const fadeDefault = 500;

$(document).ready(function() {
        let materialUnique = false;
        let materialNames = [];
        let materialType = '';
        let materialQuantity = 0;
        let materialDistribution = '';
        let materialSequence = '';
        let materialPrimaryColor = '';
        let materialSecondaryColor = '';
        let materialItems = [];

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
                        materialNames.push($('#materialSelect').val());

                        if(materialNames.includes('corals') || materialNames.includes('insets')) {
                                hideSecondaryColor();

                                $('#materialColor').fadeIn(fadeDefault);
                        } else {
                                $('#materialTypeQuestion').text('Qual é o tipo de material?');
                                if(materialNames.includes('corals') || materialNames.includes('insets')) {
                                        removeTransparentOption();
                                }

                                $('#materialCharacteristic').fadeIn(fadeDefault);
                        }
                } else {
                        $('#materialSelect').val().forEach(function(material) {
                                materialNames.push(material);
                        });

                        $('#materialTypeQuestion').text('Qual é o tipo de material?');

                        if(materialNames.length == 1) {
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

                if(!materialNames.includes('corals') || !materialNames.includes('insets')) {
                        materialNameLabel = document.getElementById('materialSelect');
                        materialNameText = materialNameLabel
                                .options[materialNameLabel.selectedIndex]
                                .innerHTML;

                        $('#materialTypeQuestion')
                                .text('Quais são os tipos de ' + materialNameText.toLowerCase() + '?')
                }

                if(materialNames.includes('corals') || materialNames.includes('insets')) {
                        removeTransparentOption();
                }

                $('#materialCharacteristic').fadeIn(fadeDefault);

                moveToBottom();

                disableElement($('#randomOptionBtn'));
                disableElement($(this));
        });

        $('#orderedOptionBtn').click(function() {
                materialDistribution = 'ordered';

                if(!materialNames.includes('corals') || !materialNames.includes('insets')) {
                        materialNameLabel = document.getElementById('materialSelect');
                        materialNameText = materialNameLabel
                                .options[materialNameLabel.selectedIndex]
                                .innerHTML;

                        $('#materialTypeQuestion')
                                .text('Quais são os tipos de ' + materialNameText.toLowerCase() + '?')
                }

                addSequenceOption(materialQuantity);

                $('#ordenation').fadeIn(fadeDefault);

                moveToBottom();

                disableElement($('#orderedOptionBtn'));
                disableElement($(this));
        });

        $('#confirmSequenceBtn').click(function() {
                materialSequence = $('#sequenceSelect').val();

                if(materialNames.includes('corals') || materialNames.includes('insets')) {
                        removeTransparentOption();
                }

                $('#materialCharacteristic').fadeIn(fadeDefault);

                moveToBottom();

                disableElement($('#sequenceSelect'));
                disableElement($(this));
        });

        $('#confirmMaterialTypeBtn').click(function() {
                materialType = $('#characteristicMaterialSelect').val();

                if(materialType == 'liso') {
                        hideSecondaryColor();
                }

                $('#materialColor').fadeIn(fadeDefault);

                moveToBottom();

                disableElement($('#characteristicMaterialSelect'));
                disableElement($(this));
        });

        $('#confirmMaterialColorBtn').click(function() {
                materialPrimaryColor = $('#primaryColorInput').val();
                materialSecondaryColor = $('#secondaryColorInput').val();

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
               drawNecklace(materialNames,
                            materialItems,
                            materialType,
                            materialQuantity,
                            materialDistribution,
                            materialSequence,
                            materialPrimaryColor,
                            materialSecondaryColor
               );

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

        $(document).on('click', '#materialImages img', function() {
                const imageId = $(this).attr('id');

                materialItems.push(imageId);
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

        $('#primaryColorInput').val('#000000');
        $('#secondaryColorInput').val('#000000');

        showSecondaryColor();

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

function hideSecondaryColor() {
        $('#secondaryColorLabel').hide();
        $('#secondaryColorInput').hide();
}

function showSecondaryColor() {
        $('#secondaryColorLabel').show();
        $('#secondaryColorInput').show();
}

function AddMaterialImages(folders) {
        folders.forEach(function(folder) {
                svgStringsList(folder).forEach(function(svgString) {
                        const svgBase64 = btoa(unescape(encodeURIComponent(svgString.svg)));
                        const svgDataUrl = `data:image/svg+xml;base64,${svgBase64}`;
                        const imgElement = $('<img>')
                                .attr('id', svgString.id)
                                .attr('title', svgString.title)
                                .attr('src', svgDataUrl)
                                .attr('alt', svgString.id);

                        $('#materialImages').append(imgElement);

                        imgElement.on('load', () => { URL.revokeObjectURL(svgDataUrl); });
                });
        });
}

function svgStringsList (folder) {
        if(folder == 'insets') {
                return [
                        { id: 'bolaArmada', title: 'bola aramada', svg: bolaAramada() },
                        { id: 'luxo', title: 'luxo' , svg: luxo() },
                        { id: 'ovalAramado', title: 'oval aramado', svg: ovalAramado() },
                        { id: 'strass', title: 'strass', svg: strass() }
                ];
        }

        if(folder == 'corals') {
                return [
                        { id: 'coral', title: 'coral', svg: coral() }
                ]
        }

        if(folder == 'crystals') {
                return [
                        { id: 'cristal1', title: 'cristal transparente pequeno', svg: cristal1() },
                        { id: 'cristal2', title: 'cristal transparente médio', svg: cristal2() },
                        { id: 'cristal3', title: 'cristal transparente grande', svg: cristal3() },
                        { id: 'leitoso1', title: 'cristal leitoso pequeno', svg: leitoso1() },
                        { id: 'leitoso2', title: 'cristal leitoso médio', svg: leitoso2() },
                        { id: 'leitoso3', title: 'cristal leitoso grande', svg: leitoso3() },
                        { id: 'metalico1', title: 'cristal dourado pequeno', svg: metalico1() },
                        { id: 'metalico2', title: 'cristal dourado médio', svg: metalico2() },
                        { id: 'metalico3', title: 'cristal dourado grande', svg: metalico3() },
                        { id: 'prateado1', title: 'cristal prateado pequeno', svg: prateado1() },
                        { id: 'prateado2', title: 'cristal prateado médio', svg: prateado2() },
                        { id: 'prateado3', title: 'cristal prateado grance ', svg: prateado3() }
                ];
        }

        if(folder == 'beads') {
                return [
                        { id: 'canjicaoCristal', title: 'canjicão cristal', svg: canjicaoCristal() },
                        { id: 'canjicao', title: 'canjicão', svg: canjicao() },
                        { id: 'micanguinha', title: 'miçanguinha', svg: micanguinha() },
                        { id: 'rajadao', title: 'rajadão', svg: rajadao() },
                        { id: 'rajado', title: 'rajado', svg: rajado() }
                ];
        }

        if(folder == 'muranos') {
                return [
                        { id: 'azeitonaCristalRajada', title: 'azeitona cristal rajada', svg: azeitonaCristalRajada() },
                        { id: 'azeitonaCristal', title: 'azeitona cristal', svg: azeitonaCristal() },
                        { id: 'azeitonaRajada', title: 'azeitona rajada', svg: azeitonaRajada() },
                        { id: 'azeitona', title: 'azeitona', svg: azeitona() },
                        { id: 'bolaCristalRajada', title: 'bola cristal rajada', svg: bolaCristalRajada() },
                        { id: 'bolaCristal', title: 'bola cristal', svg: bolaCristal() },
                        { id: 'bolaRajada', title: 'bola rajada', svg: bolaRajada() },
                        { id: 'bola', title: 'bola', svg: bola() },
                        { id: 'cartola', title: 'cartola', svg: cartola() },
                        { id: 'caveiraCristal', title: 'caveira cristal', svg: caveiraCristal() },
                        { id: 'caveira', title: 'caveira', svg: caveira() },
                        { id: 'coracaoCristalRajado', title: 'coração cristal rajado', svg: coracaoCristalRajado() },
                        { id: 'coracaoCristal', title: 'coração cristal', svg: coracaoCristal() },
                        { id: 'coracaoRajado', title: 'coração rajado', svg: coracaoRajado() },
                        { id: 'coracao', title: 'coração', svg: coracao() },
                        { id: 'dadoCristal', title: 'dado cristal', svg: dadoCristal() },
                        { id: 'dado', title: 'dado', svg: dado() },
                        { id: 'firmaCortadaRajada', title: 'firma cortada rajada', svg: firmaCortadaRajada() },
                        { id: 'firmaCortada', title: 'firma cortada', svg: firmaCortada() },
                        { id: 'firmaCristalCortadaRajada', title: 'firma cristal cortada rajada', svg: firmaCristalCortadaRajada() },
                        { id: 'firmaCristalCortada', title: 'firma cristal cortada', svg: firmaCristalCortada() },
                        { id: 'firmaCristalRajada', title: 'firma cristal rajada', svg: firmaCristalRajada() },
                        { id: 'firmaCristal', title: 'firma cristal', svg: firmaCristal() },
                        { id: 'firmaCristalTorcidaRajada', title: 'firma cristal torcida rajada', svg: firmaCristalTorcidaRajada() },
                        { id: 'firmaCristalTorcida', title: 'firma cristal torcida', svg: firmaCristalTorcida() },
                        { id: 'firmaRajada', title: 'firma rajada', svg: firmaRajada() },
                        { id: 'firma', title: 'firma', svg: firma() },
                        { id: 'firmaTorcidaRajada', title: 'firma torcida rajada', svg: firmaTorcidaRajada() },
                        { id: 'firmaTorcida', title: 'firma torcida', svg: firmaTorcida() },
                        { id: 'meteoroCristalRajado', title: 'meteoto cristal rajado', svg: meteoroCristalRajado() },
                        { id: 'meteoroCristal', title: 'meteoro cristal', svg: meteoroCristal() },
                        { id: 'meteoroRajado', title: 'meteoro rajado', svg: meteoroRajado() },
                        { id: 'meteoro', title: 'meteoro', svg: meteoro() },
                        { id: 'peixeCristalRajado', title: 'peixe cristal rajado', svg: peixeCristalRajado() },
                        { id: 'peixeCristal', title: 'peixe cristal', svg: peixeCristal() },
                        { id: 'peixeRajado', title: 'peixe rajado', svg: peixeRajado() },
                        { id: 'peixe', title: 'peixe', svg: peixe() },
                        { id: 'pitangaCristalRajada', title: 'pitanga cristal rajada', svg: pitangaCristalRajada() },
                        { id: 'pitangaCristal', title: 'pitanga cristal', svg: pitangaCristal() },
                        { id: 'pitangaRajada', title: 'pitanga rajada', svg: pitangaRajada() },
                        { id: 'pitanga', title: 'pitanga', svg: pitanga() },
                        { id: 'rosaCristalRajada', title: 'rosa cristal rajada', svg: rosaCristalRajada() },
                        { id: 'rosaCristal', title: 'rosa cristal', svg: rosaCristal() },
                        { id: 'rosaRajada', title: 'rosa rajada', svg: rosaRajada() },
                        { id: 'rosa', title: 'rosa', svg: rosa() },
                        { id: 'sextavadoCristalRajado', title: 'sextavado cristal rajado', svg: sextavadoCristalRajado() },
                        { id: 'sextavadoCristal', title: 'sextavado cristal', svg: sextavadoCristal() },
                        { id: 'sextavadoRajado', title: 'sextavado rajado', svg: sextavadoRajado() },
                        { id: 'sextavado', title: 'sextavado', svg: sextavado() }
                ];
        }
}

function drawNecklace(materialNames, materialItems, materialType, materialQuantity, materialDistribution, materialSequence, materialPrimaryColor, materialSecondaryColor) {
        console.log("Materiais: " + materialNames);
        console.log("Itens: " + materialItems);
        console.log("Tipo: " + materialType);
        console.log("Quantidade: " + materialQuantity);
        console.log("Distribuição: " + materialDistribution);
        console.log("Sequencia: " + materialSequence);
        console.log("Cor Primária: " + materialPrimaryColor);
        console.log("Cor Secundária: " + materialSecondaryColor);
}
