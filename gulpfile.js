const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");

 



gulp.task('default',  function(done) {

  
  done();
});




gulp.task("styles", function(done) {
  gulp
    .src("sass/**/*.scss")
    .pipe(sass({outputStyle: 'compressed'})
    .on("error", sass.logError))
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"]
      })
    )
    .pipe(gulp.dest("dist/css"));
    done();
});

//Atualiza automaticamente
gulp.task("watch", function(done) {
  gulp.watch('sass/**/*.scss', gulp.parallel('styles'));
  gulp.watch('*.html', gulp.parallel('copyHTML'));
  gulp.watch("js/**/*.js", gulp.parallel("script-js"));
  done();
})

// Copia e salva dentra da pasta dist todo o html atualizado
gulp.task("copyHTML", function(done) {
  gulp.src("./*.html")
      .pipe(gulp.dest("./dist"));
      done();
});

//Copia os arquivos js para a pasta dist
gulp.task("script-js", function(done) {
  gulp.src("js/**/*.js")// Pega os arquivos js da pasta root
      .pipe(gulp.dest("./dist/js"));// copia e joga no js dentro da pasta dist
      done();
})
