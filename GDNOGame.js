// ============================================
// ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ
// ============================================
var Widht = screen.availWidth - 180
var Height = screen.availHeight - 200
var GroundLevel = 585
var gridOffsetY = (GroundLevel + 29) % 40
var gridBaseY = GroundLevel + 29
var Level = 40
var currentSlot = 1            // Текущий слот сохранения (1, 2, 3)
var saveMessage = ""           // Текст уведомления
var saveMessageTimer = 0       // Таймер показа уведомления

var lCode = []
var home = -1         // -1 - главное меню, 0 - игра, 1 - редактор, 10 - победа
var player
var blocks = []
var sMoves = []
var camY = 0
var time = 0
var pst = 0
var placeO = 0        // Смещение редактора по X
var placeOY = 0       // Смещение редактора по Y
var mode = "block"    // "block", "spike", "del"
var modes = ["block", "spike", "del"]

// Начальный код уровня
lCode = [
    "blo", 1000, GroundLevel,
    "blo", 1040, GroundLevel,
    "blo", 1080, GroundLevel,
    "blo", 1120, GroundLevel,
    "blo", 1160, GroundLevel - (1 * Level),
    "blo", 1160, GroundLevel,
    "blo", 1200, GroundLevel,
    "blo", 1200, GroundLevel - (1 * Level),
    "blo", 1240, GroundLevel - (1 * Level),
    "blo", 1240, GroundLevel,
    "blo", 1280, GroundLevel - (1 * Level),
    "blo", 1280, GroundLevel,
    "blo", 1360, GroundLevel - (1 * Level),
    "blo", 1440, GroundLevel - (1 * Level),
    "blo", 1400, GroundLevel - (1 * Level),
    "blo", 1320, GroundLevel - (1 * Level),
    "spi", 1320, GroundLevel - (2 * Level),
    "spi", 1360, GroundLevel - (2 * Level),
    "blo", 1320, GroundLevel,
    "blo", 1360, GroundLevel,
    "blo", 1400, GroundLevel,
    "blo", 1440, GroundLevel,
    "blo", 1400, GroundLevel - (2 * Level),
    "blo", 1440, GroundLevel - (2 * Level),
    "blo", 1480, GroundLevel - (2 * Level),
    "blo", 1520, GroundLevel - (2 * Level),
    "blo", 1560, GroundLevel - (2 * Level),
    "blo", 1680, GroundLevel - (2 * Level),
    "blo", 1640, GroundLevel - (2 * Level),
    "blo", 1600, GroundLevel - (2 * Level),
    "blo", 1720, GroundLevel - (2 * Level),
    "blo", 1760, GroundLevel - (2 * Level),
    "blo", 1800, GroundLevel - (2 * Level),
    "blo", 1880, GroundLevel - (2 * Level),
    "blo", 1840, GroundLevel - (2 * Level),
    "spi", 1720, GroundLevel - (3 * Level),
    "spi", 1760, GroundLevel - (3 * Level),
    "blo", 1800, GroundLevel - (3 * Level),
    "blo", 1840, GroundLevel - (3 * Level),
    "blo", 1880, GroundLevel - (3 * Level),
    "blo", 2040, GroundLevel - (2 * Level),
    "blo", 2200, GroundLevel - (3 * Level),
    "blo", 2360, GroundLevel - (1 * Level),
    "spi", 1920, GroundLevel,
    "spi", 1960, GroundLevel,
    "spi", 2000, GroundLevel,
    "spi", 1880, GroundLevel,
    "spi", 2040, GroundLevel,
    "spi", 2080, GroundLevel,
    "spi", 2120, GroundLevel,
    "spi", 2160, GroundLevel,
    "spi", 2200, GroundLevel,
    "spi", 2240, GroundLevel,
    "spi", 2280, GroundLevel,
    "spi", 2320, GroundLevel,
    "spi", 2800, GroundLevel,
    "blo", 3120, GroundLevel,
    "blo", 3160, GroundLevel,
    "blo", 3280, GroundLevel,
    "blo", 3320, GroundLevel,
    "blo", 3360, GroundLevel,
    "blo", 3400, GroundLevel,
    "spi", 3200, GroundLevel,
    "spi", 3240, GroundLevel,
    "spi", 3080, GroundLevel,
    "blo", 3520, GroundLevel - (1 * Level),
    "blo", 3920, GroundLevel - (3 * Level),
    "blo", 3960, GroundLevel - (3 * Level),
    "blo", 4000, GroundLevel - (3 * Level),
    "blo", 4040, GroundLevel - (3 * Level),
    "blo", 4080, GroundLevel - (3 * Level),
    "blo", 4120, GroundLevel - (2 * Level),
    "blo", 4160, GroundLevel - (2 * Level),
    "blo", 4200, GroundLevel - (2 * Level),
    "blo", 4240, GroundLevel - (2 * Level),
    "blo", 4400, GroundLevel - (2 * Level),
    "blo", 4440, GroundLevel - (2 * Level),
    "blo", 4480, GroundLevel - (2 * Level),
    "blo", 4520, GroundLevel - (2 * Level),
    "spi", 4240, GroundLevel,
    "spi", 4280, GroundLevel,
    "spi", 4320, GroundLevel,
    "spi", 4360, GroundLevel,
    "spi", 4400, GroundLevel,
    "spi", 4960, GroundLevel,
    "spi", 5000, GroundLevel,
    "blo", 5280, GroundLevel,
    "blo", 5320, GroundLevel - (1 * Level),
    "blo", 5240, GroundLevel,
    "blo", 5200, GroundLevel,
    "blo", 5360, GroundLevel - (1 * Level),
    "blo", 5400, GroundLevel - (1 * Level),
    "blo", 5440, GroundLevel - (1 * Level),
    "blo", 5480, GroundLevel - (1 * Level),
    "blo", 5520, GroundLevel - (1 * Level),
    "blo", 5560, GroundLevel - (1 * Level),
    "spi", 5600, GroundLevel,
    "spi", 5640, GroundLevel,
    "spi", 5760, GroundLevel,
    "spi", 5800, GroundLevel,
    "blo", 3840, GroundLevel - (3 * Level),
    "blo", 3880, GroundLevel - (3 * Level),
    "blo", 3760, GroundLevel - (3 * Level),
    "blo", 3680, GroundLevel - (2 * Level),
    "blo", 3640, GroundLevel - (2 * Level),
    "blo", 3800, GroundLevel - (3 * Level),
]

// ============================================
// setup()
// ============================================
function setup() {
    createCanvas(Widht, Height);

    // Создаём объекты уровня
    for (let i = 0; i < lCode.length; i += 3) {
        if (lCode[i] == "spi") {
            blocks.push(new spike(lCode[i + 1], lCode[i + 2]))
        }
        if (lCode[i] == "blo") {
            blocks.push(new block(lCode[i + 1], lCode[i + 2]))
        }
    }

    background(100);

    // ============================================
    // ОБЪЕКТ ИГРОКА
    // ============================================
    player = {
        x: 75,
        y: height - 100,
        yVel: 0,
        dead: false,
        air: false,
        rot: 0,
        xR: 0,
        jumpst: 0,
        c: 0,
        speed: 12,

        move: function() {
            if (!this.dead) { this.xR += (player.speed) }

            this.yVel += 1.3;
            this.y += this.yVel;

            if (this.y >= height - 100) {
                this.y = height - 100;
                this.yVel = 0;
                this.air = false;
            }

            if (this.dead) {
                this.dead = false;
                this.y = height - 100;
                player.xR = 0;
                this.yVel = 0;
                this.c = 0;
            } else {
                this.c = 0
            }
        },

        show: function() {
            if (this.air) {
                this.rot += 8
            } else {
                if (this.rot > round(this.rot / 90) * 90 + 40) {
                    this.rot -= 38
                } else {
                    if (this.rot < round(this.rot / 90) * 90 - 40) {
                        this.rot += 38
                    } else {
                        this.rot = round(this.rot / 90) * 90
                    }
                }
            }

            if (keyIsDown(32) || mouseIsPressed || keyIsDown(38)) {
                if (this.air == false) {
                    this.yVel = -15.3;
                    this.air = true;
                }
            }

            if (!this.dead) {
                push()
                translate(75, this.y)
                angleMode(DEGREES)
                rotate(this.rot)
                rectMode(CENTER)
                fill(0, 0, 195)
                stroke(0, 0, 0);
                strokeWeight(2)
                rect(0, 0, 40)
                pop()
            }
        }
    }
}

// ============================================
// ground() - ОТРИСОВКА ЗЕМЛИ
// ============================================
function ground() {
    rectMode(CORNER)
    stroke(255)
    strokeWeight(1)
    colorMode(HSB, 360, 100, 100)

    let groundTop = height - 100 + 20 + 2
    let groundHeight = 150

    let startX = -40 - (player.xR % 40)
    for (let i = startX; i < width + 40; i += 40) {
        let worldX = i + player.xR
        let hue = (frameCount * 2 + worldX / 5) % 360
        fill(hue, 80, 95)
        rect(i, groundTop, 40, groundHeight)
    }

    noStroke()
    colorMode(RGB, 255)
}

// ============================================
// editorUI() - ИНТЕРФЕЙС РЕДАКТОРА
// ============================================
function editorUI() {
    // Полупрозрачная панель сверху
    fill(0, 0, 0, 150)
    noStroke()
    rect(0, 0, width, 50)

    textAlign(LEFT, CENTER)
    textSize(16)
    fill(255)
    text("РЕДАКТОР УРОВНЯ", 10, 25)

    // Кнопки режимов
    let btnX = 200
    let btnW = 100
    let btnH = 35
    let btnY = 8

    // Кнопка "Блок" (1)
    if (mode == "block") fill(0, 180, 0)
    else fill(80)
    stroke(255)
    strokeWeight(1)
    rect(btnX, btnY, btnW, btnH, 5)
    fill(255)
    noStroke()
    textAlign(CENTER, CENTER)
    textSize(14)
    text("1: Блок", btnX + btnW / 2, btnY + btnH / 2)

    // Кнопка "Шип" (2)
    btnX += btnW + 10
    if (mode == "spike") fill(180, 0, 0)
    else fill(80)
    stroke(255)
    strokeWeight(1)
    rect(btnX, btnY, btnW, btnH, 5)
    fill(255)
    noStroke()
    text("2: Шип", btnX + btnW / 2, btnY + btnH / 2)

    // Кнопка "Удалить" (3)
    btnX += btnW + 10
    if (mode == "del") fill(180, 100, 0)
    else fill(80)
    stroke(255)
    strokeWeight(1)
    rect(btnX, btnY, btnW, btnH, 5)
    fill(255)
    noStroke()
    text("3: Удалить", btnX + btnW / 2, btnY + btnH / 2)

    // Кнопка "Играть" (Enter / кнопка)
    btnX += btnW + 30
    fill(0, 100, 200)
    stroke(255)
    strokeWeight(2)
    rect(btnX, btnY, btnW, btnH, 5)
    fill(255)
    noStroke()
    text("▶ Играть", btnX + btnW / 2, btnY + btnH / 2)

    // Кнопка "Очистить всё"
    btnX += btnW + 10
    fill(150, 0, 0)
    stroke(255)
    strokeWeight(1)
    rect(btnX, btnY, btnW + 20, btnH, 5)
    fill(255)
    noStroke()
    text("Очистить всё", btnX + (btnW + 20) / 2, btnY + btnH / 2)

    // Подсказки снизу
    fill(0, 0, 0, 150)
    noStroke()
    rect(0, height - 30, width, 30)
    fill(255)
    textAlign(LEFT, CENTER)
    textSize(12)
    text("ЛКМ — поставить/удалить  |  Колёсико/Shift+ЛКМ — прокрутка  |  Tab — выход в игру  |  Объектов: " + blocks.length, 10, height - 15)

        // ====== КНОПКИ СОХРАНЕНИЯ ======
    // Ряд снизу над подсказками
    let saveY = height - 70
    let saveBtnW = 70
    let saveBtnH = 30
    let saveX = 10

    // Заголовок
    fill(255)
    noStroke()
    textAlign(LEFT, CENTER)
    textSize(13)
    text("Слоты (4/5/6):", saveX, saveY - 18)

    // Кнопки слотов 1, 2, 3
    for (let s = 1; s <= 3; s++) {
        let sx = saveX + (s - 1) * (saveBtnW + 5)
        // Подсветка текущего слота
        if (s == currentSlot) {
            stroke(255, 220, 0)
            strokeWeight(2)
            fill(60, 60, 120)
        } else {
            stroke(200)
            strokeWeight(1)
            fill(50)
        }
        rect(sx, saveY, saveBtnW, saveBtnH, 4)

        // Проверка, есть ли данные в слоте
        let hasData = localStorage.getItem("geometry_level_" + s) !== null
        fill(255)
        noStroke()
        textAlign(CENTER, CENTER)
        textSize(12)
        text((hasData ? "●" : "○") + " Слот " + s, sx + saveBtnW / 2, saveY + saveBtnH / 2)
    }

    // Кнопка "💾 Сохранить"
    let actX = saveX + 3 * (saveBtnW + 5) + 10
    let actW = 110
    fill(40, 140, 60)
    stroke(255)
    strokeWeight(1)
    rect(actX, saveY, actW, saveBtnH, 4)
    fill(255)
    noStroke()
    text("💾 Сохранить", actX + actW / 2, saveY + saveBtnH / 2)

    // Кнопка "📂 Загрузить"
    actX += actW + 5
    fill(60, 100, 180)
    stroke(255)
    strokeWeight(1)
    rect(actX, saveY, actW, saveBtnH, 4)
    fill(255)
    noStroke()
    text("📂 Загрузить", actX + actW / 2, saveY + saveBtnH / 2)

    // Кнопка "✕ Очистить слот"
    actX += actW + 5
    fill(140, 40, 40)
    stroke(255)
    strokeWeight(1)
    rect(actX, saveY, actW, saveBtnH, 4)
    fill(255)
    noStroke()
    text("✕ Очистить слот", actX + actW / 2, saveY + saveBtnH / 2)

    // ====== УВЕДОМЛЕНИЕ О СОХРАНЕНИИ ======
    if (saveMessageTimer > 0) {
        let alpha = Math.min(255, saveMessageTimer * 4)
        fill(0, 0, 0, alpha * 0.7)
        noStroke()
        rectMode(CENTER)
        rect(width / 2, height / 2, 400, 60, 10)
        fill(255, 255, 255, alpha)
        textAlign(CENTER, CENTER)
        textSize(20)
        text(saveMessage, width / 2, height / 2)
        rectMode(CORNER)
        saveMessageTimer--
    }
}

// ============================================
// СОХРАНЕНИЕ И ЗАГРУЗКА УРОВНЕЙ
// ============================================
function saveLevel(slot) {
    try {
        let data = []
        for (let i = 0; i < blocks.length; i++) {
            let b = blocks[i]
            // Сохраняем "чистую" координату y (без +29)
            if (b.id == "blo") {
                data.push(["blo", b.xh, b.y - 29])  // Вычитаем 29
            } else if (b.id == "spi") {
                data.push(["spi", b.x2, b.y - 29])  // Вычитаем 29
            }
        }
        localStorage.setItem("geometry_level_" + slot, JSON.stringify(data))
        showMessage("✓ Сохранено в слот " + slot)
    } catch (e) {
        showMessage("✗ Ошибка сохранения: " + e.message)
    }
}

function loadLevel(slot) {
    try {
        let raw = localStorage.getItem("geometry_level_" + slot)
        if (!raw) {
            showMessage("✗ Слот " + slot + " пуст")
            return
        }
        let data = JSON.parse(raw)
        blocks = []
        for (let i = 0; i < data.length; i++) {
            let type = data[i][0]
            let x = data[i][1]
            let y = data[i][2]
            if (type == "blo") {
                let nb = new block(x, y)
                nb.xh = x
                blocks.push(nb)
            } else if (type == "spi") {
                let ns = new spike(x, y)
                ns.x2 = x
                blocks.push(ns)
            }
        }
        showMessage("✓ Загружен слот " + slot + " (" + blocks.length + " объектов)")
    } catch (e) {
        showMessage("✗ Ошибка загрузки: " + e.message)
    }
}

function showMessage(text) {
    saveMessage = text
    saveMessageTimer = 120   // показывать 2 секунды (при 60 fps)
}

// ============================================
// editorGrid() - СЕТКА РЕДАКТОРА
// ============================================
function editorGrid() {
    stroke(255, 255, 255, 40)
    strokeWeight(1)

    // Вертикальные линии (X): шаг 40px, смещение от placeO
    let vx = ((-placeO) % 40 + 40) % 40
    for (let i = vx; i < width + 40; i += 40) {
        line(i, 50, i, height)
    }

    // Горизонтальные линии (Y): шаг 40px, проходят через gridBaseY
    // На экране: Y_line = gridBaseY - placeOY + 40*k
    let firstLine = gridBaseY - placeOY
    // Найдём ближайшую линию ВЫШЕ верхней границы экрана
    let kStart = Math.floor((50 - firstLine) / 40) - 1
    for (let k = kStart; k < (height - 50) / 40 + 5; k++) {
        let yLine = firstLine + 40 * k
        if (yLine > 50 && yLine < height) {
            line(0, yLine, width, yLine)
        }
    }

    // Линия пола (жёлтая) — точно по центру нижних блоков
    stroke(255, 255, 0, 100)
    strokeWeight(2)
    line(0, gridBaseY - placeOY, width, gridBaseY - placeOY)

    noStroke()
}

// ============================================
// ГЛАВНОЕ МЕНЮ
// ============================================
function drawMainMenu() {
    // Анимированный фон
    colorMode(HSB, 360, 100, 100)
    let bgHue = (frameCount * 1.5) % 360
    background(bgHue, 40, 15)
    colorMode(RGB, 255)

    // Декоративные движущиеся фигуры на фоне
    noStroke()
    for (let i = 0; i < 12; i++) {
        let x = ((frameCount * (1 + i * 0.3) + i * 200) % (width + 200)) - 100
        let y = height / 2 + sin(frameCount * 0.02 + i) * 150
        let hue = (frameCount * 3 + i * 30) % 360
        colorMode(HSB, 360, 100, 100)
        fill(hue, 70, 80, 0.15)
        colorMode(RGB, 255)
        push()
        translate(x, y)
        rotate(frameCount * 0.02 + i)
        rectMode(CENTER)
        rect(0, 0, 40 + i * 3, 40 + i * 3)
        pop()
    }

    // Заголовок
    textAlign(CENTER, CENTER)
    noStroke()

    // Тень заголовка
    fill(0, 0, 0, 150)
    textSize(64)
    textStyle(BOLD)
    text("УМНАЯ ИГРА", width / 2 + 3, height / 3 + 3)

    // Основной заголовок с градиентным цветом
    colorMode(HSB, 360, 100, 100)
    let titleHue = (frameCount * 3) % 360
    fill(titleHue, 80, 100)
    text("УМНАЯ ИГРА", width / 2, height / 3)
    colorMode(RGB, 255)
    textStyle(NORMAL)

    // Кнопки меню
    let btnW = 260
    let btnH = 60
    let btnX = width / 2 - btnW / 2
    let btnY1 = height / 2 + 20
    let btnY2 = height / 2 + 100

    // Кнопка "Играть"
    let hover1 = (mouseX > btnX && mouseX < btnX + btnW && mouseY > btnY1 && mouseY < btnY1 + btnH)
    if (hover1) {
        fill(0, 200, 80)
    } else {
        fill(0, 150, 60)
    }
    stroke(255)
    strokeWeight(2)
    rect(btnX, btnY1, btnW, btnH, 10)
    noStroke()
    fill(255)
    textSize(28)
    textStyle(BOLD)
    text("▶  ИГРАТЬ", width / 2, btnY1 + btnH / 2)

    // Кнопка "Редактор"
    let hover2 = (mouseX > btnX && mouseX < btnX + btnW && mouseY > btnY2 && mouseY < btnY2 + btnH)
    if (hover2) {
        fill(80, 120, 220)
    } else {
        fill(50, 80, 180)
    }
    stroke(255)
    strokeWeight(2)
    rect(btnX, btnY2, btnW, btnH, 10)
    noStroke()
    fill(255)
    textSize(28)
    text("✎  РЕДАКТОР", width / 2, btnY2 + btnH / 2)
    textStyle(NORMAL)

    // Подсказка внизу
    fill(255, 255, 255, 150)
    textSize(14)
    text("Нажмите для выбора", width / 2, height - 40)
}

// ============================================
// draw()
// ============================================
function draw() {

    if (home == -1) {
        drawMainMenu()
        return   // выходим, чтобы не рисовать остальное
    }

    // ====== ЭКРАН ПОБЕДЫ ======
        if (home == 10) {
        background(0);
        fill(255)
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(50)
        text("You beat the level!", width / 2, height / 2)

        textSize(20)
        fill(200)
        text("Нажмите Enter — в меню  |  R — переиграть", width / 2, height / 2 + 70)
    }

    // ====== РЕЖИМ ИГРЫ ======
    if (home == 0) {
        push()

        if (player.xR > 9000) { home = 10 }

        // Камера
        if (-player.y + height - 100 > height - 100) {
            if (camY > -player.y + height - 100 + 3) {
                camY -= 3
            } else {
                if (camY < -player.y + height - 100 - 3) {
                    camY += 3
                } else {
                    camY = -player.y + height - 100
                }
            }
        } else {
            if (camY > -player.y + height - 100 + 3) {
                camY -= player.yVel + 30
            }
        }

        translate(0, camY)

        // Фон
        colorMode(HSB, 360, 100, 100)
        let bgHue = (frameCount * 2) % 360
        background(bgHue, 30, 20)
        colorMode(RGB, 255)

        ground()
        player.air = true
        noStroke()
        player.move()

        noStroke()

        // Отрисовка объектов
        for (let i = 0; i < blocks.length; i++) {
            blocks[i].show()
        }

        for (let i = 0; i < sMoves.length; i++) {
            sMoves[i].show()
            if (sMoves[i].x < -100) { sMoves.splice(i, 1); i-- }
        }

        push()
        player.show()
        pop()

        pop()
    }

        // ====== РЕЖИМ РЕДАКТОРА ======
    if (home == 1) {
        // Фон
        background(30)

        // Применяем смещение камеры ко всей отрисовке мира
        push()
        translate(0, camY)

        // Сетка
        editorGrid()

        // Отрисовка всех объектов (без движения)
        for (let i = 0; i < blocks.length; i++) {
            let b = blocks[i]
            let drawX = b.x - placeO
            let drawY = b.y - placeOY

            colorMode(HSB, 360, 100, 100)
            let hue = (frameCount * 2 + b.x / 5) % 360
            fill(hue, 80, 95)
            stroke(255)
            strokeWeight(1)
            rectMode(CENTER)

            if (b.id == "blo") {
                rect(drawX, drawY, 40, 40)
            } else if (b.id == "spi") {
                triangle(
                    drawX - 20, drawY + 20,
                    drawX + 20, drawY + 20,
                    drawX, drawY - 20
                )
            }
            noStroke()
            colorMode(RGB, 255)
        }

        // Отрисовка игрока на старте
        push()
        rectMode(CENTER)
        fill(0, 0, 195)
        stroke(255)
        strokeWeight(2)
        rect(75 - placeO, height - 100 - placeOY, 40, 40)
        pop()

        pop() // Восстанавливаем трансформацию

        // Интерфейс редактора (РИСУЕТСЯ БЕЗ translate)
        editorUI()

        // Подсветка курсора (тоже БЕЗ translate, т.к. mouse координаты экранные)
        if (mouseY > 50) {
            let snapX = round((mouseX + placeO) / 40) * 40 - placeO
            // Учитываем camY при конвертации mouseY в мировые координаты
            let worldMouseY = mouseY - camY
            let centerY = round((worldMouseY + placeOY - gridBaseY) / 40) * 40 + gridBaseY
            let snapY = centerY - placeOY + camY  // Возвращаем в экранные координаты

            push()
            rectMode(CENTER)
            noFill()
            stroke(255, 255, 0, 180)
            strokeWeight(2)

            if (mode == "block") {
                rect(snapX, snapY + 29, 40, 40)
            } else if (mode == "spike") {
                triangle(
                    snapX - 20, snapY + 29 + 20,
                    snapX + 20, snapY + 29 + 20,
                    snapX, snapY + 29 - 20
                )
            } else if (mode == "del") {
                stroke(255, 0, 0, 220)
                line(snapX - 15, snapY - 15, snapX + 15, snapY + 15)
                line(snapX + 15, snapY - 15, snapX - 15, snapY + 15)
            }
            pop()
        }
    }
}
// ============================================
// РАЗМЕЩЕНИЕ/УДАЛЕНИЕ ОБЪЕКТОВ
// ============================================
function placeB() {
    if (home == 1 && mouseY > 50) {
        let bx = round((mouseX + placeO) / 40) * 40
        let targetY = round((mouseY + placeOY - gridOffsetY) / 40) * 40 + gridOffsetY
        let by = targetY - 29

        // Проверка: не размещать блоки ниже пола
        if (by > GroundLevel + 29) {
            return
        }

        // Проверяем, есть ли уже объект в этой позиции
        let exists = false
        for (let i = 0; i < blocks.length; i++) {
            if (blocks[i].x == bx && blocks[i].y == targetY) {
                exists = true
                break
            }
        }

        if (!exists) {
            if (mode == "block") {
                let newBlock = new block(bx, by)
                newBlock.xh = bx
                blocks.push(newBlock)
            }
            if (mode == "spike") {
                let newSpike = new spike(bx, by)
                newSpike.x2 = bx
                blocks.push(newSpike)
            }
        }

        if (mode == "del") {
            for (let i = blocks.length - 1; i >= 0; i--) {
                let drawX = blocks[i].x - placeO
                let drawY = blocks[i].y - placeOY
                if (dist(mouseX, mouseY, drawX, drawY) < 25) {
                    blocks.splice(i, 1)
                    break
                }
            }
        }
    }
}


function mouseDragged() {
    if (home == 1) {
        // Если зажат Shift — прокрутка
        if (keyIsDown(SHIFT)) {
            placeO -= mouseX - pmouseX
            placeOY -= mouseY - pmouseY
        } else {
            placeB()
        }
    }
}

function mousePressed() {
    // ====== КЛИКИ В ГЛАВНОМ МЕНЮ ======
    if (home == -1) {
        let btnW = 260
        let btnH = 60
        let btnX = width / 2 - btnW / 2
        let btnY1 = height / 2 + 20
        let btnY2 = height / 2 + 100

        // Кнопка "Играть"
        if (mouseX > btnX && mouseX < btnX + btnW && mouseY > btnY1 && mouseY < btnY1 + btnH) {
            home = 0
            player.xR = 0
            player.y = height - 100
            player.yVel = 0
            player.dead = false
            camY = 0
            return
        }
        // Кнопка "Редактор"
        if (mouseX > btnX && mouseX < btnX + btnW && mouseY > btnY2 && mouseY < btnY2 + btnH) {
            home = 1
            camY = 0
            placeO = 0
            placeOY = 0
            return
        }
        return   // в меню больше ничего не обрабатываем
    }
    if (home == 1) {
        // Проверка кликов по кнопкам UI
        let btnX = 200
        let btnW = 100
        let btnH = 35
        let btnY = 8

        // Кнопка "Блок"
        if (mouseX > btnX && mouseX < btnX + btnW && mouseY > btnY && mouseY < btnY + btnH) {
            mode = "block"; return
        }
        btnX += btnW + 10
        // Кнопка "Шип"
        if (mouseX > btnX && mouseX < btnX + btnW && mouseY > btnY && mouseY < btnY + btnH) {
            mode = "spike"; return
        }
        btnX += btnW + 10
        // Кнопка "Удалить"
        if (mouseX > btnX && mouseX < btnX + btnW && mouseY > btnY && mouseY < btnY + btnH) {
            mode = "del"; return
        }
        btnX += btnW + 30
        // Кнопка "Играть"
        // Внутри mousePressed(), блок кнопки "Играть":
        if (mouseX > btnX && mouseX < btnX + btnW && mouseY > btnY && mouseY < btnY + btnH) {
            home = 0
            player.xR = 0
            player.y = height - 100
            player.yVel = 0
            player.dead = false
            camY = 0
            placeO = 0
            placeOY = 0
            
            // ✅ Только сбрасываем текущие позиции, не трогая мировые
            for (let i = 0; i < blocks.length; i++) {
                blocks[i].x = blocks[i].xh
                if (blocks[i].id == "spi") blocks[i].x = blocks[i].x2
            }
            return
        }
        btnX += btnW + 10
        // Кнопка "Очистить всё"
        if (mouseX > btnX && mouseX < btnX + btnW + 20 && mouseY > btnY && mouseY < btnY + btnH) {
            blocks = []
            return
        }

        // Размещение объектов
        placeB()

        // ====== Обработка кликов по кнопкам сохранения ======
        let saveY = height - 70
        let saveBtnW = 70
        let saveBtnH = 30
        let saveX = 10

        // Клик по слотам 1, 2, 3
        for (let s = 1; s <= 3; s++) {
            let sx = saveX + (s - 1) * (saveBtnW + 5)
            if (mouseX > sx && mouseX < sx + saveBtnW && mouseY > saveY && mouseY < saveY + saveBtnH) {
                currentSlot = s
                return
            }
        }

        // Кнопка "Сохранить"
        let actX = saveX + 3 * (saveBtnW + 5) + 10
        let actW = 110
        if (mouseX > actX && mouseX < actX + actW && mouseY > saveY && mouseY < saveY + saveBtnH) {
            saveLevel(currentSlot)
            return
        }

        // Кнопка "Загрузить"
        actX += actW + 5
        if (mouseX > actX && mouseX < actX + actW && mouseY > saveY && mouseY < saveY + saveBtnH) {
            loadLevel(currentSlot)
            return
        }

        // Кнопка "Очистить слот"
        actX += actW + 5
        if (mouseX > actX && mouseX < actX + actW && mouseY > saveY && mouseY < saveY + saveBtnH) {
            try {
                localStorage.removeItem("geometry_level_" + currentSlot)
                showMessage("✓ Слот " + currentSlot + " очищен")
            } catch (e) {
                showMessage("✗ Ошибка: " + e.message)
            }
            return
        }
    }
}

// Прокрутка колёсиком мыши
function mouseWheel(event) {
    if (home == 1) {
        placeOY += event.delta * 0.5
        placeO += event.delta * 0.5
    }
}

// ============================================
// ОБРАБОТЧИК КЛАВИШ
// ============================================
function keyPressed() {
    // ====== Клавиши в главном меню ======
    if (home == -1) {
        if (keyCode == ENTER || keyCode == 32) {
            home = 0
            player.xR = 0
            player.y = height - 100
            player.yVel = 0
            player.dead = false
            camY = 0
        }
        return false
    }

    // ====== Клавиши на экране победы ======
    if (home == 10) {
        if (keyCode == ENTER) {
            home = -1          // вернуться в меню
        }
        if (key == 'r' || key == 'R' || key == 'к' || key == 'К') {
            home = 0           // переиграть
            player.xR = 0
            player.y = height - 100
            player.yVel = 0
            player.dead = false
            camY = 0
            // Сброс блоков к исходным позициям
            for (let i = 0; i < blocks.length; i++) {
                blocks[i].x = blocks[i].xh
                if (blocks[i].id == "spi") blocks[i].x = blocks[i].x2
            }
        }
        return false
    }
    if (key == '1') mode = "block"
    if (key == '2') mode = "spike"
    if (key == '3') mode = "del"

    if (keyCode == 9) {
        if (home == 0) {
            // ВХОД В РЕДАКТОР
            home = 1
            camY = 0
            placeO = 0
            placeOY = 0
            
            // ✅ Сбрасываем блоки к мировым координатам
            for (let i = 0; i < blocks.length; i++) {
                blocks[i].x = blocks[i].xh
                if (blocks[i].id == "spi") blocks[i].x = blocks[i].x2
            }
            
            player.y = height - 100
            player.xR = 0
            player.yVel = 0
            player.dead = false
        } else if (home == 1) {
            // ВЫХОД В ИГРУ
            home = 0
            camY = 0
            player.xR = 0
            player.y = height - 100
            player.yVel = 0
            player.dead = false
            
            // ✅ Сбрасываем блоки к мировым координатам
            for (let i = 0; i < blocks.length; i++) {
                blocks[i].x = blocks[i].xh
                if (blocks[i].id == "spi") blocks[i].x = blocks[i].x2
            }
        }
        return false
    }

    if (home == 1) {
        if (keyCode == LEFT_ARROW) placeO -= 40
        if (keyCode == RIGHT_ARROW) placeO += 40
        if (keyCode == UP_ARROW) placeOY -= 40
        if (keyCode == DOWN_ARROW) placeOY += 40
        
        // WASD для перемещения
        if (key == 'w' || key == 'ц' || key == 'W' || key == 'Ц') placeOY -= 40
        if (key == 'a' || key == 'ф' || key == 'A' || key == 'Ф') placeO -= 40
        if ((key == 's' || key == 'ы' || key == 'S' || key == 'Ы') && !keyIsDown(CONTROL)) placeOY += 40
        if (key == 'd' || key == 'в' || key == 'D' || key == 'В') placeO += 40
    }

    if (home == 1) {
        // Выбор слота цифрами 4, 5, 6
        if (key == '4') currentSlot = 1
        if (key == '5') currentSlot = 2
        if (key == '6') currentSlot = 3

        // Ctrl+S — быстрое сохранение
        if ((key == 's' || key == 'ы') && keyIsDown(CONTROL)) {
            saveLevel(currentSlot)
            return false
        }
        // Ctrl+L — быстрая загрузка
        if ((key == 'l' || key == 'д') && keyIsDown(CONTROL)) {
            loadLevel(currentSlot)
            return false
        }
    }
}

// ============================================
// КЛАСС block - ИСПРАВЛЕННЫЙ show()
// ============================================
function block(x, y) {
    this.x = round(x / 40) * 40
    this.y = y + 29
    this.id = "blo"
    this.xh = round(x / 40) * 40  // МИРОВАЯ КООРДИНАТА (не меняется!)

    this.show = function() {
        // Начинаем каждый кадр с мировой позиции
        this.x = this.xh
        // Сдвигаем влево на пройденное расстояние
        if (home == 0 && !player.dead) {
            this.x -= player.xR / 1.4
        }

        colorMode(HSB, 360, 100, 100)
        let hue = (frameCount * 2 + this.x / 5) % 360
        fill(hue, 80, 95)
        rectMode(CENTER)
        stroke(255)
        strokeWeight(1)
        rect(this.x, this.y, 40)
        noStroke()
        colorMode(RGB, 255)

        if (home == 0 && !player.dead) {
            if (player.y > this.y - 39 && player.y < this.y + 20 &&
                player.x > this.x - 39 && player.x < this.x + 39) {
                player.y -= player.yVel;
                player.yVel = 0;
                player.air = false;
            }
            if (player.y > this.y - 25 && player.y < this.y + 35 &&
                player.x > this.x - 39 && player.x < this.x + 39) {
                player.dead = true
            }
            while (player.y > this.y - 39 && player.y < this.y + 20 &&
                player.x > this.x - 39 && player.x < this.x + 39) {
                player.y -= 0.1
            }
        }
    }
}

// ============================================
// КЛАСС spike - ИСПРАВЛЕННЫЙ show()
// ============================================
function spike(x, y) {
    this.x = round(x / 40) * 40
    this.x2 = round(x / 40) * 40  // МИРОВАЯ КООРДИНАТА (не меняется!)
    this.id = "spi"
    this.y = y + 29

    this.show = function() {
        this.x = this.x2
        if (home == 0 && !player.dead) {
            this.x -= player.xR / 1.4
        }

        colorMode(HSB, 360, 100, 100)
        let hue = (frameCount * 2 + this.x / 5) % 360
        fill(hue, 80, 95)
        rectMode(CENTER)
        stroke(255)
        strokeWeight(1)
        triangle(this.x - 20, this.y + 20, this.x + 20, this.y + 20, this.x, this.y - 20)
        noStroke()
        colorMode(RGB, 255)

        if (home == 0 && !player.dead) {
            if (player.y > this.y - 39 && player.y < this.y + 39 &&
                player.x > this.x - 25 && player.x < this.x + 25) {
                player.dead = true
            }
        }
    }
}