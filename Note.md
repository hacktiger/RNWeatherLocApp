/// NOTEs
- import Data1, {Data2, Data3} from '../' ; ( Data1 : export default | Data2, Data3 : export) !important
- async funcs return a promise

/// TESTS 


// Design : change default bundling output folder to be in src/ directory instead of build folder. You can do this by changing react properties at the top of your build.gradle (app build gradle)
ext.react = [
        bundleInRelease        : true,
        resourcesDirRelease   : "src/release/res"
]
apply from: "../react.gradle" /*Check file for more information*/
apply plugin: 'com.android.application'
please note that properties names are dynamic and depends on your target names, bundleIn, resourcesDir

Add generated files to git ignore, to keep your native resources folder clean
android/app/src/*/res/*/reactnative_*.png
android/app/src/*/res/*/node_modules_*.png
Reverse dependency between this react gradle task (bundling) and merging assets and resources.
This is the hardest part, you need to change this file {project_root_dir}/node_modules/react-native/react.gradle, In my case I copied this file to my project and keep updating it with each react release. The change is quite simple
replace
currentBundleTask.dependsOn("merge${targetName}Resources")
currentBundleTask.dependsOn("merge${targetName}Assets")
with

runBefore("merge${targetName}Resources", currentBundleTask)
runBefore("merge${targetName}Assets", currentBundleTask)