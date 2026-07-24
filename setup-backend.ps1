# QuizArena - Backend NestJS structure generator

$root = "apps\api\src"


# Dossiers modules
$folders = @(
    "$root\auth",
    "$root\users",
    "$root\quiz",
    "$root\questions",
    "$root\duel",
    "$root\ranking",
    "$root\websocket",
    "$root\prisma",
    "$root\common"
)


foreach ($folder in $folders) {

    if (!(Test-Path $folder)) {
        New-Item -ItemType Directory -Path $folder | Out-Null
        Write-Host "Created: $folder"
    }

}


# Fichiers principaux
$files = @(

    "$root\auth\auth.controller.ts",
    "$root\auth\auth.service.ts",
    "$root\auth\auth.module.ts",

    "$root\users\users.controller.ts",
    "$root\users\users.service.ts",
    "$root\users\users.module.ts",

    "$root\quiz\quiz.controller.ts",
    "$root\quiz\quiz.service.ts",
    "$root\quiz\quiz.module.ts",

    "$root\questions\questions.controller.ts",
    "$root\questions\questions.service.ts",
    "$root\questions\questions.module.ts",

    "$root\duel\duel.gateway.ts",
    "$root\duel\duel.service.ts",
    "$root\duel\duel.module.ts",

    "$root\ranking\ranking.service.ts",
    "$root\ranking\ranking.module.ts",

    "$root\websocket\websocket.gateway.ts",

    "$root\prisma\prisma.service.ts"

)


foreach ($file in $files) {

    if (!(Test-Path $file)) {
        New-Item -ItemType File -Path $file | Out-Null
        Write-Host "Created: $file"
    }

}


Write-Host ""
Write-Host "QuizArena backend structure created !" -ForegroundColor Green