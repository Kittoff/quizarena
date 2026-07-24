# QuizArena - Frontend structure generator

$root = "apps\web\src"

# Dossiers
$folders = @(
    "$root\app\components",
    "$root\app\quiz",
    "$root\lib",
    "$root\hooks",
    "$root\store",
    "$root\types",
    "$root\data"
)

foreach ($folder in $folders) {
    if (!(Test-Path $folder)) {
        New-Item -ItemType Directory -Path $folder | Out-Null
        Write-Host "Created: $folder"
    }
}


# Fichiers
$files = @(
    "$root\app\components\Header.tsx",
    "$root\app\components\QuizCard.tsx",
    "$root\app\components\Button.tsx",

    "$root\lib\language.ts",

    "$root\hooks\useQuiz.ts",

    "$root\store\quizStore.ts",

    "$root\types\quiz.ts",

    "$root\data\questions.json"
)

foreach ($file in $files) {
    if (!(Test-Path $file)) {
        New-Item -ItemType File -Path $file | Out-Null
        Write-Host "Created: $file"
    }
}


Write-Host ""
Write-Host "QuizArena frontend structure created successfully !" -ForegroundColor Green