const quantityLimit = 50;
const fadeDefault = 500;

let materialUnique = false;
let materialFamilies = [];
let materialDistribution = '';
let materialSequence = [];
let materialColors = [];
let materialAllItems = [];
let materialItems = [];
let materialsColorDescription = [];

$(document).ready(function() {
        $('#userName').focus();

        // Button of say-your-name section that prepares the necklace creation section
        $('#confirmYourNameBtn').click(function() {
                if ($('#userName').val() != '') {
                        let userName = $('#userName').val();
                        $('#userQuestion').text(userName + ', quer criar seu fio?');

                        $('#createNecklace').fadeIn(fadeDefault);

                        moveToBottom();

                        disableElement($('#userName'));
                        disableElement($(this));
                }
        });

        // Button of create-necklace section that prepares the materials diversity section
        $('#yesCreateNecklaceBtn').click(function() {
                $('#materialsDiversification').fadeIn(fadeDefault);

                moveToBottom();

                disableElement($('#noCreateNecklaceBtn'));
                disableElement($(this));
        });

        // Button of create-necklace section that prepares the start-again section
        $('#noCreateNecklaceBtn').click(function() {
                $('#materialsDiversification').fadeOut(fadeDefault);

                $('#callGrandmamma').fadeIn(fadeDefault);

                moveToBottom();

                disableElement($('#yesCreateNecklaceBtn'));
                disableElement($(this));
        });

        // Button of materials-diversification section that prepares the inform-material-family section
        $('#confirmMaterialUniqueBtn').click(function() {
                materialUnique = true;

                $('#materialQuestion').text('Qual material você quer usar?');

                $('#materialsFamily').fadeIn(fadeDefault);

                moveToBottom();

                disableElement($('#confirmMaterialVariousBtn'));
                disableElement($(this));
        });

        // Button of materials-diversification section that prepares the inform-material-family section
        $('#confirmMaterialVariousBtn').click(function() {
                let materialList = document.getElementById('materialSelect');

                materialUnique = false;

                $('#materialQuestion').text('Quais materiais você quer usar?');

                $('#materialSelect').css({'height': '120px'});

                materialList.setAttribute('multiple', true);

                $('#materialsFamily').fadeIn(fadeDefault);

                moveToBottom();

                disableElement($('#confirmMaterialUniqueBtn'));
                disableElement($('#confirmMaterialFamilyBtn'));
                disableElement($(this));
        });

        // Button of materials-family section that prepares the materials-color section
        $('#confirmMaterialFamilyBtn').click(function() {
                const onlyOneColor = ['coral', 'strass', 'luxo'];
                const withoutColor = [
                        'metalico1',
                        'metalico2',
                        'metalico3',
                        'prateado1',
                        'prateado2',
                        'prateado3',
                        'bolaAramada',
                        'ovalAramado'
                ];

                if(materialUnique == true) {
                        materialFamilies.push($('#materialSelect').val());

                        // If material is without color,
                        // the see-necklace section is prepared
                        if(withoutColor.includes(materialItems[0])) {
                                $('#seeNecklace').fadeIn(fadeDefault);

                                moveToBottom();

                                disableElement($('#materialSelect'));
                                disableElement($(this));

                                return;
                        }

                        // If material is unique and has only one color, the materials-color section is prepared
                        if(onlyOneColor.includes(materialItems[0])) {
                                hideSecondaryColor();

                                createMaterialColorForm(materialItems)

                                $('#materialsColor').fadeIn(fadeDefault);

                                moveToBottom();

                                disableElement($('#materialSelect'));
                                disableElement($(this));

                                return;
                        }

                        // If material is unique and is "Rajado" or "Strass" or "Luxo",
                        // the materials-color (with two colors section is prepared
                        if(materialItems[0].includes('Rajad')) {
                                createMaterialColorForm(materialItems)

                                $('#materialsColor').fadeIn(fadeDefault);
                        // If material is unique and is not "Rajado",
                        // the materials-color (with one colors section is prepared
                        } else {
                                hideSecondaryColor();

                                createMaterialColorForm(materialItems)

                                $('#materialsColor').fadeIn(fadeDefault);
                        }
                } else {
                        materialItems.forEach(function(item) {
                                if(onlyOneColor.includes(item)) {
                                        materialsColorDescription
                                                .push( { material: item, oneColor: true } );

                                        return;
                                }
                        });

                        createMaterialColorForm(materialItems);

                        $('#materialsColor').fadeIn(fadeDefault);
                }

                moveToBottom();

                disableElement($('#materialSelect'));
                disableElement($(this));
        });

        // Button of materials-family section that prepares the materials-distribution section
        $('#confirmRandomDistributionBtn').click(function() {
                materialDistribution = 'random';

                $('#seeNecklace').fadeIn(fadeDefault);

                moveToBottom();

                disableElement($('#confirmRandomDistributionBtn'));
                disableElement($(this));
        });

        // Button of materials-family section that prepares the materials-distribution section
        $('#confirmOrderedDistributionBtn').click(function() {
                materialDistribution = 'ordered';

                createMaterialSequenceForm();

                disableElement($('#confirmMaterialsOrdenationBtn'));

                $('#materialsOrdenation').fadeIn(fadeDefault);

                moveToBottom();

                disableElement($('#confirmOrderedDistributionBtn'));
                disableElement($(this));
        });

        // Button of materials-ordenation section that prepares the see-necklace section
        $('#confirmMaterialsOrdenationBtn').click(function() {
                $('#seeNecklace').fadeIn(fadeDefault);

                moveToBottom();

                disableElement($('#confirmMaterialsOrdenationBtn'));
                disableElement($(this));
        });

        // Button of materials-color section that prepares the materials-color section
        $('#confirmMaterialTypeBtn').click(function() {
                materialType = $('#MaterialTypeSelect').val();

                if(materialType == 'liso') {
                        hideSecondaryColor();
                }

                $('#materialsColor').fadeIn(fadeDefault);

                moveToBottom();

                disableElement($('#MaterialTypeSelect'));
                disableElement($(this));
        });

        // Button of materials-color section that prepares
        // the see-necklace section or the materials-distribution section
        $(document).on('click', '#confirmMaterialColorBtn', function() {
                if(materialUnique) {
                        $('#seeNecklace').fadeIn(fadeDefault);
                } else {
                        $('#materialsDistribution').fadeIn(fadeDefault);
                }

                moveToBottom();

                disableElement($(this));
        });

        // Button of see-necklace section that prepares the start-again section
        $('#noSeeNecklanceBtn').click(function() {
                $('#startAgain').fadeIn(fadeDefault);

                moveToBottom();

                disableElement($('#yesSeeNecklanceBtn'));
                disableElement($(this));
        });

        // Button of see-necklace section that prepares the necklace-image section
        $('#yesSeeNecklanceBtn').click(function() {
                drawNecklace();

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

        $('#downloadBtn').click(function() {
                const $captureElement = $("#necklaceDone");

                html2canvas($captureElement[0], { backgroundColor: '#262626' }).then(function (canvas) {
                        const link = document.createElement("a");

                        link.download = "fio-de-contas.png";
                        link.href = canvas.toDataURL("image/png");
                        link.click();
                });
        });

        $('#materialSelect').change(function() {
                var selectedImage = $(this).val();

                $('#materialImages').empty();

                if (selectedImage) {
                        materialAllItems = [];

                        addMaterialImages(selectedImage);
                }

                $('#confirmMaterialBtn').removeAttr('disabled');
        });

        $(document).on('click', '#materialImages img', function() {
                const imageId = $(this).attr('id');

                // Then materiai is unique, all items are disabled and the selected item is enabled
                if(materialUnique) {
                        materialItems = [];

                        materialAllItems.forEach(function(item) {
                                obj = $('#' + item);
                                disableElement(obj);
                                obj.css('background-color', 'transparent');
                        });

                        materialItems.push(imageId);

                        $(this).removeAttr('disabled');
                } else {
                        materialItems.push(imageId);

                        $(this).css('background-color', '#006600');

                        if(materialItems.length < 2) {
                                disableElement($('#confirmMaterialFamilyBtn'));
                        } else {
                                $('#confirmMaterialFamilyBtn').removeAttr('disabled');
                        }

                }
        });

        $(document).on('change', '#colorsHexa input', function() {
                const selectedId = $(this).attr('id');
                const selectedColor = $(this).val();

                materialColors.push({ id: selectedId, color: selectedColor });
        });

        $(document).on('change', '#materialsSequence select', function() {
                const selectedId = $(this).attr('id');
                const selectedItem = $(this).val();

                materialSequence.push({ id: selectedId.replace("sequence", "") + "Id", sequence: selectedItem });

                if($(this).val() == '0') {
                        disableElement($('#confirmMaterialsOrdenationBtn'));
                } else {
                        $('#confirmMaterialsOrdenationBtn').removeAttr('disabled');

                        disableElement($(this));
                }
        });
});

function createMaterialSequenceForm() {
        newDiv = $('#materialsSequence');
        materialItems.forEach(function(item) {
                const newLabel = $("<label>", { text: searchMaterialName(item + "Id") });
                newDiv.append(newLabel);

                const newLine1 = $("<br>");
                newDiv.append(newLine1);

                const newSelect = $("<select>", { id: "sequence" + item });
                newDiv.append(newSelect);

                for (let i = 0; i <= 10; i++) {
                        const newOption = $("<option>", { value: i, text: i });
                        newSelect.append(newOption);
                }

                const newLine2 = $("<br>");
                newDiv.append(newLine2);
                const newLine3 = $("<br>");
                newDiv.append(newLine3);
        });
}

function createMaterialColorForm(materialItems) {
        const withoutColor = [
                        'metalico1',
                        'metalico2',
                        'metalico3',
                        'prateado1',
                        'prateado2',
                        'prateado3',
                        'bolaAramada',
                        'ovalAramado'
                ];

        materialItems.forEach(function(item) {
                if(withoutColor.includes(item)) { return; }

                itemId = item + "Id";

                itemName = searchMaterialName(itemId);

                const newParagraph = $("<p>", {
                        id: "materialColorQuestion",
                        text: "Qual é o cor do  material de " + itemName +"?"
                });
                $("#materialColorDiv").append(newParagraph);

                const newDiv = $("<div>", { class: "colors", id: 'colorsHexa' });
                $("#materialColorDiv").append(newDiv);

                const newLabel1 = $("<label>", { id: "primaryColorLabel",
                                                 text: "Cor Primária",
                                                 css: { 'font-size': '2.5rem' }});
                newDiv.append(newLabel1);
                const newLine1 = $("<br>");
                newDiv.append(newLine1);
                const newInput1 = $("<input>", { id: itemId,
                                                 type: "color",
                                                 value: "#000000",
                                                 css: { width: '100px',
                                                        height: '50px',
                                                        cursor: 'pointer' }});
                newDiv.append(newInput1);

                if(itemName.includes('rajada') || itemName.includes('rajado')) {
                        const newLine2 = $("<br>");
                        newDiv.append(newLine2);
                        const newLine3 = $("<br>");
                        newDiv.append(newLine3);

                        const newLabel2 = $("<label>", { id: "secondaryColorLabel",
                                                         text: "Cor Secundária",
                                                         css: { 'font-size': '2.5rem' }});
                        newDiv.append(newLabel2);
                        const newLine4 = $("<br>");
                        newDiv.append(newLine4);
                        const newInput2 = $("<input>", { id: itemId,
                                                         type: "color",
                                                         value: "#000000",
                                                         css: { width: '100px',
                                                                height: '50px',
                                                                cursor: 'pointer' }});
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
        materialUnique = false;
        materialFamilies = [];
        materialDistribution = '';
        materialSequence = [];
        materialColors = [];
        materialAllItems = [];
        materialItems = [];

        $('#sayYourName').fadeOut(fadeDefault);
        $('#createNecklace').fadeOut(fadeDefault);
        $('#materialsDiversification').fadeOut(fadeDefault);
        $('#materialsFamily').fadeOut(fadeDefault);
        $('#materialsDistribution').fadeOut(fadeDefault);
        $('#materialsOrdenation').fadeOut(fadeDefault);
        $('#materialsColor').fadeOut(fadeDefault);
        $('#seeNecklace').fadeOut(fadeDefault);
        $('#necklaceImage').fadeOut(fadeDefault);
        $('#startAgain').fadeOut(fadeDefault);
        $('#callGrandmamma').fadeOut(fadeDefault);

        sleep();

        $('button').each(function() { $(this).prop('disabled', false); });
        $('select').each(function() { $(this).prop('disabled', false); });

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

                materialAllItems.push(svgString.id);

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
                        { id: 'bolaAramada', title: searchMaterialName('bolaAramadaId'), svg: bolaAramada() },
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

function drawNecklace() {
        if(materialUnique) {
                for(let i = 0; i < quantityLimit; i++) {
                        materialItems.forEach(function(item) {
                                let colors = materialColors.filter(color => color.id === item + "Id");

                                // mount colors
                                let materialFunc = '';
                                if(colors.length > 1) {
                                        materialFunc = window[item](colors[0].color, colors[1].color);
                                } else if(colors.length == 1) {
                                        materialFunc = window[item](colors[0].color)
                                } else {
                                        materialFunc = window[item]()
                                }

                               // mount images
                               const svgBase64 = btoa(unescape(encodeURIComponent(materialFunc)));
                               const svgDataUrl = `data:image/svg+xml;base64,${svgBase64}`;
                               const imgElement = $('<img>').attr('src', svgDataUrl)

                               $('#necklaceDone').append(imgElement);
                        });
                }
        } else {
                let quantity = 0;

                for(let i = 0; i < quantityLimit; i++) {
                        if(quantity > quantityLimit) { break; }

                        if(materialDistribution == 'ordered'){
                                materialItems.forEach(function(item) {
                                        // mount sequence
                                        let sequence = materialSequence
                                                          .find(sequence => sequence.id === item + "Id")
                                                          .sequence;
                                        for(let i = 0; i < sequence; i++) {
                                                let colors = materialColors.filter(color => color.id === item + "Id");

                                                // mount colors
                                                let materialFunc = '';
                                               if(colors.length > 1) {
                                                       materialFunc = window[item](colors[0].color, colors[1].color)
                                               } else if(colors.length == 1) {
                                                       materialFunc = window[item](colors[0].color)
                                               } else {
                                                       materialFunc = window[item]()
                                               }

                                               // mount images
                                               const svgBase64 = btoa(unescape(encodeURIComponent(materialFunc)));
                                               const svgDataUrl = `data:image/svg+xml;base64,${svgBase64}`;
                                               const imgElement = $('<img>').attr('src', svgDataUrl)

                                               $('#necklaceDone').append(imgElement);

                                               quantity++;
                                        }
                                });
                        } else {
                                for(let i = 0; i < quantityLimit; i++) {
                                        item = materialItems[Math.floor(Math.random() * materialItems.length)];

                                        let colors = materialColors.filter(color => color.id === item + "Id");

                                        // mount colors
                                        let materialFunc = '';
                                        if(colors.length > 1) {
                                                materialFunc = window[item](colors[0].color, colors[1].color)
                                        } else if(colors.length == 1) {
                                                materialFunc = window[item](colors[0].color)
                                        } else {
                                                materialFunc = window[item]()
                                        }

                                        // mount images
                                        const svgBase64 = btoa(unescape(encodeURIComponent(materialFunc)));
                                        const svgDataUrl = `data:image/svg+xml;base64,${svgBase64}`;
                                        const imgElement = $('<img>').attr('src', svgDataUrl)

                                        $('#necklaceDone').append(imgElement);

                                        quantity++;
                                }
                        }
                }
        }

        $('#necklaceDoneMsg').text('Seu fio está pronto!');
}

function searchMaterialName(materialId) {
        materialDataList = [
                { id: 'bolaAramadaId', name: 'bola aramada' },
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
