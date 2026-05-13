const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'src');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

walk(dir, function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Reverse the exact string replacements
    content = content.replace(/text-white dark:text-\[\#05141f\] dark:text-white\/([0-9]+)/g, 'text-white/$1');
    content = content.replace(/text-\[\#05141f\] dark:text-white dark:text-\[\#05141f\]\/([0-9]+) dark:text-white\/([0-9]+)/g, 'text-white/$1');
    content = content.replace(/text-\[\#05141f\] dark:text-white dark:text-white\/([0-9]+)/g, 'text-white/$1');
    content = content.replace(/text-white dark:text-\[\#05141f\] dark:text-white/g, 'text-white');
    content = content.replace(/text-\[\#05141f\] dark:text-white\/50/g, 'text-white/50');
    
    content = content.replace(/bg-\[\#05141f\]\/([0-9]*) dark:bg-white\/([0-9]*)/g, 'bg-white/$1');
    content = content.replace(/bg-white dark:bg-\[\#05141f\]\/([0-9]*)/g, 'bg-[#05141f]/$1');
    
    content = content.replace(/border-white dark:border-\[\#05141f\] dark:border-white\/([0-9]+)/g, 'border-white/$1');
    
    content = content.replace(/bg-white dark:bg-\[\#05141f\]/g, 'bg-[#05141f]');
    content = content.replace(/text-\[\#05141f\] dark:text-white/g, 'text-white');
    content = content.replace(/border-\[\#05141f\] dark:border-white/g, 'border-white');
    content = content.replace(/text-white dark:text-\[\#05141f\]/g, 'text-[#05141f]');
    content = content.replace(/hover:bg-white dark:hover:bg-\[\#05141f\]/g, 'hover:bg-[#05141f]');
    content = content.replace(/hover:text-\[\#05141f\] dark:hover:text-white/g, 'hover:text-white');
    content = content.replace(/hover:border-\[\#05141f\] dark:hover:border-white/g, 'hover:border-white');
    
    // Clean up any remaining weirdness
    content = content.replace(/bg-white\/\s/g, 'bg-white ');
    content = content.replace(/bg-white\/\"/g, 'bg-white"');
    content = content.replace(/bg-\[\#05141f\]\/\s/g, 'bg-white/ ');
    content = content.replace(/bg-\[\#05141f\]\/\"/g, 'bg-white"');

    fs.writeFileSync(filePath, content, 'utf8');
  }
});
