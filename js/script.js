const fadeDefault = 500;

$(document).ready(function() {
        let materialUnique = false;
        let materialFamilies = [];
        let materialQuantity = 0;
        let materialDistribution = '';
        let materialSequence = '';
        let materialPrimaryColor = '';
        let materialSecondaryColor = '';
        let materialColors = [];
        let materialItems = [];
        let materialData = [];
        let materialTypes = [];

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

                $('#informMaterialQuantity').fadeIn(fadeDefault);

                moveToBottom();

                disableElement($('#materialVariousBtn'));
                disableElement($(this));
        });

        $('#materialVariousBtn').click(function() {
                materialUnique = false;

                $('#informMaterialQuantity').fadeIn(fadeDefault);

                moveToBottom();

                disableElement($('#materialUniqueBtn'));
                disableElement($(this));
        });

        $('#confirmMaterialQuantityBtn').click(function() {
                materialQuantity = $('#materialQuantitySelect').val();

                let materialList = document.getElementById('materialSelect');

                if(materialUnique == true) {
                        $('#materialQuestion').text('Qual material você quer usar?');

                        materialList.removeAttribute('multiple');
                } else {
                        $('#materialQuestion').text('Quais materiais você quer usar?');

                        $('#materialSelect').css({'height': '120px'});

                        materialList.setAttribute('multiple', true);
                }

                $('#informMaterialsFamily').fadeIn(fadeDefault);

                moveToBottom();

                disableElement($('#materialQuantitySelect'));
                disableElement($(this));
                disableElement($('#confirmMaterialBtn'));
        });

        $('#confirmMaterialBtn').click(function() {
                if(materialUnique == true) {
                        materialFamilies.push($('#materialSelect').val());

                        if(materialFamilies.includes('corals') || materialFamilies.includes('insets')) {
                                hideSecondaryColor();

                                if($('#materialSelect').val() == 'strass' || $('#materialSelect').val() == 'luxo') {
                                        createMaterialColorForm(materialItems)

                                        $('#materialColor').fadeIn(fadeDefault);
                                } else {
                                        $('#seeNecklace').fadeIn(fadeDefault);
                                }
                        } else {
                                if(materialFamilies.includes('corals') || materialFamilies.includes('insets')) {
                                        removeTransparentOption();
                                }

                                materialFamilies.push($('#materialSelect').val());

                                $('#materialColor').fadeIn(fadeDefault);
                        }
                } else {
                        $('#materialSelect').val().forEach(function(material) {
                                materialFamilies.push(material);
                        });

                        $('#materialsDistribution').fadeIn(fadeDefault);
                }

                materialData.push(materialItems);

                moveToBottom();

                disableElement($('#materialSelect'));
                disableElement($(this));
        });

        $('#randomOptionBtn').click(function() {
                materialDistribution = 'random';

                if(materialFamilies.includes('corals') || materialFamilies.includes('insets')) {
                        removeTransparentOption();
                }

                $('#materialColor').fadeIn(fadeDefault);

                moveToBottom();

                disableElement($('#randomOptionBtn'));
                disableElement($(this));
        });

        $('#orderedOptionBtn').click(function() {
                materialDistribution = 'ordered';

                addSequenceOption(materialQuantity);

                $('#ordenation').fadeIn(fadeDefault);

                moveToBottom();

                disableElement($('#orderedOptionBtn'));
                disableElement($(this));
        });

        $('#confirmSequenceBtn').click(function() {
                materialSequence = $('#sequenceSelect').val();

                if(materialFamilies.includes('corals') || materialFamilies.includes('insets')) {
                        removeTransparentOption();
                }

                createMaterialColorForm(materialItems);

                $('#materialColor').fadeIn(fadeDefault);

                moveToBottom();

                disableElement($('#sequenceSelect'));
                disableElement($(this));
        });

        $('#confirmMaterialTypeBtn').click(function() {
                materialType = $('#MaterialTypeSelect').val();

                if(materialType == 'liso') {
                        hideSecondaryColor();
                }

                $('#materialColor').fadeIn(fadeDefault);

                moveToBottom();

                disableElement($('#MaterialTypeSelect'));
                disableElement($(this));
        });

        $(document).on('click', '#confirmMaterialColorBtn', function() {
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
               drawNecklace(materialFamilies,
                            materialItems,
                            materialQuantity,
                            materialDistribution,
                            materialSequence,
                            materialColors
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
                        addMaterialImages(selectedImage);
                }

                $('#confirmMaterialBtn').removeAttr('disabled');
        });

        $(document).on('click', '#materialImages img', function() {
                const imageId = $(this).attr('id');

                if($(this).attr('chosen')) {
                        $(this).attr('chosen', false);

                        var index = $.inArray(imageId, materialItems);
                        if (index !== -1) { materialItems.splice(index, 1); }

                        $(this).css('background-color', 'transparent');
                } else {
                        if (!materialItems.includes(imageId)) { materialItems.push(imageId); }
                        $(this).css('background-color', '#006600');

                        $(this).attr('chosen', 'true');
                }
        });

        $(document).on('change', '#colorsHexa input', function() {
                const selectedId = $(this).attr('id');
                const selectedColor = $(this).val();

                materialColors.push({ id: selectedId, color: selectedColor });
        });
});

function createMaterialColorForm(materialItems) {
        materialItems.forEach(function(item) {
                itemId = item + "Id";

                itemName = searchMaterialName(itemId);

                const newParagraph = $("<p>", {
                        id: "materialColorQuestion",
                        text: "Qual é o cor do  material de " + itemName +"?"
                });
                $("#materialColorDiv").append(newParagraph);

                const newDiv = $("<div>", { class: "colors", id: 'colorsHexa' });
                $("#materialColorDiv").append(newDiv);

                const newLabel1 = $("<label>", { id: "primaryColorLabel", text: "Cor Primária" });
                newDiv.append(newLabel1);
                const newLine1 = $("<br>");
                newDiv.append(newLine1);
                const newInput1 = $("<input>", { id: "primaryColorInput-" + itemId, type: "color", value: "#000000" });
                newDiv.append(newInput1);

                if(itemName.includes('rajada') || itemName.includes('rajado') || itemName == "strass" || itemName == 'luxo' ) {
                        const newLine2 = $("<br>");
                        newDiv.append(newLine2);
                        const newLine3 = $("<br>");
                        newDiv.append(newLine3);

                        const newLabel2 = $("<label>", { id: "secondaryColorLabel", text: "Cor Secundária",value: "#000000" });
                        newDiv.append(newLabel2);
                        const newLine4 = $("<br>");
                        newDiv.append(newLine4);
                        const newInput2 = $("<input>", { id: "secondaryColorInput-" + itemId, type: "color", value: "#000000" });
                        newDiv.append(newInput2);
                }
        });


        const newDivButton = $("<div>", { class: "buttons" });
        $("#materialColorDiv").append(newDivButton);
        const newButton = $("<button>", { id: "confirmMaterialColorBtn", text: "Confirmar" });
        newDivButton.append(newButton)
}

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
        $('#informMaterialsFamily').fadeOut(fadeDefault);
        $('#materialsDistribution').fadeOut(fadeDefault);
        $('#ordenation').fadeOut(fadeDefault);
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
        const select = document.getElementById("MaterialTypeSelect");
        const valueToRemove = "transparente";

        for (let i = 0; i < select.options.length; i++) {
                if (select.options[i].value === valueToRemove) {
                        select.remove(i);
                        break;
                }
         }
}

function addTransparentOption() {
        const select = document.getElementById("MaterialTypeSelect");
        const newOption = document.createElement("option");
        newOption.value = "transparente";
        newOption.text = "Transparente";

        select.appendChild(newOption);
}

function addSequenceOption(materialQuantity) {
        quantity = parseInt(materialQuantity) / 2;

        const select = document.getElementById("sequenceSelect");

        for (let i = 2; i <= quantity; i++) {
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

function convertStringToImage(folder) {
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
}

function addMaterialImages(folders) {
        if(folders.isArray) {
                folders.forEach(function(folder) { convertStringToImage(folder); });
        } else {
                convertStringToImage(folders);
        }
}

function svgStringsList (folder) {
        if(folder == 'insets') {
                return [
                        { id: 'bolaArmada', title: searchMaterialName('bolaArmadaId'), svg: bolaAramada() },
                        { id: 'luxo', title: searchMaterialName('luxoId'), svg: luxo() },
                        { id: 'ovalAramado', title: searchMaterialName('ovalAramadoId'), svg: ovalAramado() },
                        { id: 'strass', title: searchMaterialName('strassId'), svg: strass() }
                ];
        }

        if(folder == 'corals') {
                return [
                        { id: 'coral', title: searchMaterialName('coralId'), svg: coral() }
                ]
        }

        if(folder == 'crystals') {
                return [
                        { id: 'cristal1', title: searchMaterialName('cristal1Id'), svg: cristal1() },
                        { id: 'cristal2', title: searchMaterialName('cristal2Id'), svg: cristal2() },
                        { id: 'cristal3', title: searchMaterialName('cristal3Id'), svg: cristal3() },
                        { id: 'leitoso1', title: searchMaterialName('leitoso1Id'), svg: leitoso1() },
                        { id: 'leitoso2', title: searchMaterialName('leitoso2Id'), svg: leitoso2() },
                        { id: 'leitoso3', title: searchMaterialName('leitoso3Id'), svg: leitoso3() },
                        { id: 'metalico1', title: searchMaterialName('metalico1Id'), svg: metalico1() },
                        { id: 'metalico2', title: searchMaterialName('metalico2Id'), svg: metalico2() },
                        { id: 'metalico3', title: searchMaterialName('metalico3Id'), svg: metalico3() },
                        { id: 'prateado1', title: searchMaterialName('prateado1Id'), svg: prateado1() },
                        { id: 'prateado2', title: searchMaterialName('prateado2Id'), svg: prateado2() },
                        { id: 'prateado3', title: searchMaterialName('prateado3Id'), svg: prateado3() }
                ];
        }

        if(folder == 'beads') {
                return [
                        { id: 'canjicaoCristal', title: searchMaterialName('canjicaoCristalId'), svg: canjicaoCristal() },
                        { id: 'canjicao', title: searchMaterialName('canjicaoId'), svg: canjicao() },
                        { id: 'micanguinha', title: searchMaterialName('micanguinhaId'), svg: micanguinha() },
                        { id: 'rajadao', title: searchMaterialName('rajadaoId'), svg: rajadao() },
                        { id: 'rajado', title: searchMaterialName('rajadoId'), svg: rajado() }
                ];
        }

        if(folder == 'muranos') {
                return [
                        { id: 'azeitonaCristalRajada', title: searchMaterialName('azeitonaCristalRajadaId'), svg: azeitonaCristalRajada() },
                        { id: 'azeitonaCristal', title: searchMaterialName('azeitonaCristalId'), svg: azeitonaCristal() },
                        { id: 'azeitonaRajada', title: searchMaterialName('azeitonaRajadaId'), svg: azeitonaRajada() },
                        { id: 'azeitona', title: searchMaterialName('azeitonaId'), svg: azeitona() },
                        { id: 'bolaCristalRajada', title: searchMaterialName('bolaCristalRajadaId'), svg: bolaCristalRajada() },
                        { id: 'bolaCristal', title: searchMaterialName('bolaCristalId'), svg: bolaCristal() },
                        { id: 'bolaRajada', title: searchMaterialName('bolaRajadaId'), svg: bolaRajada() },
                        { id: 'bola', title: searchMaterialName('bolaId'), svg: bola() },
                        { id: 'cartola', title: searchMaterialName('cartolaId'), svg: cartola() },
                        { id: 'caveiraCristal', title: searchMaterialName('caveiraCristalId'), svg: caveiraCristal() },
                        { id: 'caveira', title: searchMaterialName('caveiraId'), svg: caveira() },
                        { id: 'coracaoCristalRajado', title: searchMaterialName('coracaoCristalRajadoId'), svg: coracaoCristalRajado() },
                        { id: 'coracaoCristal', title: searchMaterialName('coracaoCristalRajadoId'), svg: coracaoCristal() },
                        { id: 'coracaoRajado', title: searchMaterialName('coracaoCristalId'), svg: coracaoRajado() },
                        { id: 'coracao', title: searchMaterialName('coracaoId'), svg: coracao() },
                        { id: 'dadoCristal', title: searchMaterialName('dadoCristalId'), svg: dadoCristal() },
                        { id: 'dado', title: searchMaterialName('dadoId'), svg: dado() },
                        { id: 'firmaCortadaRajada', title: searchMaterialName('firmaCortadaRajadaId'), svg: firmaCortadaRajada() },
                        { id: 'firmaCortada', title: searchMaterialName('firmaCortadaId'), svg: firmaCortada() },
                        { id: 'firmaCristalCortadaRajada', title: searchMaterialName('firmaCristalCortadaRajadaId'), svg: firmaCristalCortadaRajada() },
                        { id: 'firmaCristalCortada', title: searchMaterialName('firmaCristalCortadaId'), svg: firmaCristalCortada() },
                        { id: 'firmaCristalRajada', title: searchMaterialName('firmaCristalRajadaId'), svg: firmaCristalRajada() },
                        { id: 'firmaCristal', title: searchMaterialName('firmaCristalId'), svg: firmaCristal() },
                        { id: 'firmaCristalTorcidaRajada', title: searchMaterialName('firmaCristalTorcidaRajadaId'), svg: firmaCristalTorcidaRajada() },
                        { id: 'firmaCristalTorcida', title: searchMaterialName('firmaCristalTorcidaId'), svg: firmaCristalTorcida() },
                        { id: 'firmaRajada', title: searchMaterialName('firmaRajadaId'), svg: firmaRajada() },
                        { id: 'firma', title: searchMaterialName('firmaId'), svg: firma() },
                        { id: 'firmaTorcidaRajada', title: searchMaterialName('firmaTorcidaRajadaId'), svg: firmaTorcidaRajada() },
                        { id: 'firmaTorcida', title: searchMaterialName('firmaTorcidaId'), svg: firmaTorcida() },
                        { id: 'meteoroCristalRajado', title: searchMaterialName('meteoroCristalRajadoId'), svg: meteoroCristalRajado() },
                        { id: 'meteoroCristal', title: searchMaterialName('meteoroCristalId'), svg: meteoroCristal() },
                        { id: 'meteoroRajado', title: searchMaterialName('meteoroRajadoId'), svg: meteoroRajado() },
                        { id: 'meteoro', title: searchMaterialName('meteoroId'), svg: meteoro() },
                        { id: 'peixeCristalRajado', title: searchMaterialName('peixeCristalRajadoId'), svg: peixeCristalRajado() },
                        { id: 'peixeCristal', title: searchMaterialName('peixeCristalId'), svg: peixeCristal() },
                        { id: 'peixeRajado', title: searchMaterialName('peixeRajadoId'), svg: peixeRajado() },
                        { id: 'peixe', title: searchMaterialName('peixeId'), svg: peixe() },
                        { id: 'pitangaCristalRajada', title: searchMaterialName('pitangaCristalRajadaId'), svg: pitangaCristalRajada() },
                        { id: 'pitangaCristal', title: searchMaterialName('pitangaCristalId'), svg: pitangaCristal() },
                        { id: 'pitangaRajada', title: searchMaterialName('pitangaRajadaId'), svg: pitangaRajada() },
                        { id: 'pitanga', title: searchMaterialName('pitangaId'), svg: pitanga() },
                        { id: 'rosaCristalRajada', title: searchMaterialName('rosaCristalRajadaId'), svg: rosaCristalRajada() },
                        { id: 'rosaCristal', title: searchMaterialName('rosaCristalId'), svg: rosaCristal() },
                        { id: 'rosaRajada', title: searchMaterialName('rosaRajadaId'), svg: rosaRajada() },
                        { id: 'rosa', title: searchMaterialName('rosaId'), svg: rosa() },
                        { id: 'sextavadoCristalRajado', title: searchMaterialName('sextavadoCristalRajadoId'), svg: sextavadoCristalRajado() },
                        { id: 'sextavadoCristal', title: searchMaterialName('sextavadoCristalId'), svg: sextavadoCristal() },
                        { id: 'sextavadoRajado', title: searchMaterialName('sextavadoRajadoId'), svg: sextavadoRajado() },
                        { id: 'sextavado', title: searchMaterialName('sextavadoId'), svg: sextavado() }
                ];
        }
}

function drawNecklace(materialFamilies, materialItems, materialQuantity, materialDistribution, materialSequence, materialColors) {
        console.log("Famílias: " + materialFamilies);
        console.log("Itens: " + materialItems);
        console.log("Quantidade: " + materialQuantity);
        console.log("Distribuição: " + materialDistribution);
        console.log("Sequencia: " + materialSequence);
        console.log("Cores: " + materialColors);
}

function searchMaterialName(materialId) {
        materialDataList = [
                { id: 'bolaArmadaId', name: 'bola aramada' },
                { id: 'luxoId', name: 'luxo'  },
                { id: 'ovalAramadoId', name: 'oval aramado' },
                { id: 'strassId', name: 'strass' },
                { id: 'coralId', name: 'coral' },
                { id: 'cristal1Id', name: 'cristal transparente pequeno' },
                { id: 'cristal2Id', name: 'cristal transparente médio' },
                { id: 'cristal3Id', name: 'cristal transparente grande' },
                { id: 'leitoso1Id', name: 'cristal leitoso pequeno' },
                { id: 'leitoso2Id', name: 'cristal leitoso médio' },
                { id: 'leitoso3Id', name: 'cristal leitoso grande' },
                { id: 'metalico1Id', name: 'cristal dourado pequeno' },
                { id: 'metalico2Id', name: 'cristal dourado médio' },
                { id: 'metalico3Id', name: 'cristal dourado grande' },
                { id: 'prateado1Id', name: 'cristal prateado pequeno' },
                { id: 'prateado2Id', name: 'cristal prateado médio' },
                { id: 'prateado3Id', name: 'cristal prateado grande' },
                { id: 'canjicaoCristalId', name: 'canjicão cristal' },
                { id: 'canjicaoId', name: 'canjicão' },
                { id: 'micanguinhaId', name: 'miçanguinha' },
                { id: 'rajadaoId', name: 'rajadão' },
                { id: 'rajadoId', name: 'rajado' },
                { id: 'azeitonaCristalRajadaId', name: 'azeitona cristal rajada' },
                { id: 'azeitonaCristalId', name: 'azeitona cristal' },
                { id: 'azeitonaRajadaId', name: 'azeitona rajada' },
                { id: 'azeitonaId', name: 'azeitona' },
                { id: 'bolaCristalRajadaId', name: 'bola cristal rajada' },
                { id: 'bolaCristalId', name: 'bola cristal' },
                { id: 'bolaRajadaId', name: 'bola rajada' },
                { id: 'bolaId', name: 'bola' },
                { id: 'cartolaId', name: 'cartola' },
                { id: 'caveiraCristalId', name: 'caveira cristal' },
                { id: 'caveiraId', name: 'caveira' },
                { id: 'coracaoCristalRajadoId', name: 'coração cristal rajado' },
                { id: 'coracaoCristalId', name: 'coração cristal' },
                { id: 'coracaoRajadoId', name: 'coração rajado' },
                { id: 'coracaoId', name: 'coração' },
                { id: 'dadoCristalId', name: 'dado cristal' },
                { id: 'dadoId', name: 'dado' },
                { id: 'firmaCortadaRajadaId', name: 'firma cortada rajada' },
                { id: 'firmaCortadaId', name: 'firma cortada' },
                { id: 'firmaCristalCortadaRajadaId', name: 'firma cristal cortada rajada' },
                { id: 'firmaCristalCortadaId', name: 'firma cristal cortada' },
                { id: 'firmaCristalRajadaId', name: 'firma cristal rajada' },
                { id: 'firmaCristalId', name: 'firma cristal' },
                { id: 'firmaCristalTorcidaRajadaId', name: 'firma cristal torcida rajada' },
                { id: 'firmaCristalTorcidaId', name: 'firma cristal torcida' },
                { id: 'firmaRajadaId', name: 'firma rajada' },
                { id: 'firmaId', name: 'firma' },
                { id: 'firmaTorcidaRajadaId', name: 'firma torcida rajada' },
                { id: 'firmaTorcidaId', name: 'firma torcida' },
                { id: 'meteoroCristalRajadoId', name: 'meteoto cristal rajado' },
                { id: 'meteoroCristalId', name: 'meteoro cristal' },
                { id: 'meteoroRajadoId', name: 'meteoro rajado' },
                { id: 'meteoroId', name: 'meteoro' },
                { id: 'peixeCristalRajadoId', name: 'peixe cristal rajado' },
                { id: 'peixeCristalId', name: 'peixe cristal' },
                { id: 'peixeRajadoId', name: 'peixe rajado' },
                { id: 'peixeId', name: 'peixe' },
                { id: 'pitangaCristalRajadaId', name: 'pitanga cristal rajada' },
                { id: 'pitangaCristalId', name: 'pitanga cristal' },
                { id: 'pitangaRajadaId', name: 'pitanga rajada' },
                { id: 'pitangaId', name: 'pitanga' },
                { id: 'rosaCristalRajadaId', name: 'rosa cristal rajada' },
                { id: 'rosaCristalId', name: 'rosa cristal' },
                { id: 'rosaRajadaId', name: 'rosa rajada' },
                { id: 'rosaId', name: 'rosa' },
                { id: 'sextavadoCristalRajadoId', name: 'sextavado cristal rajado' },
                { id: 'sextavadoCristalId', name: 'sextavado cristal' },
                { id: 'sextavadoRajadoId', name: 'sextavado rajado' },
                { id: 'sextavadoId', name: 'sextavado' }
        ]

        const result = materialDataList.find(hash => hash.id === materialId);

        return result.name;
}
