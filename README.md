# ReactNative

## Usage

(1) $expo init <your project name>  
(2) 下載這個 repository 的檔案到本地端(git clone 或直接下載)，並取代 expo init <your project name>同樣名字的檔案和資料夾  
(3) $expo start 或是 $expo start --tunnel  
(4) 開啟 emulator (eg. browser, android 模擬器, android 手機等)  
(5) Used native-base: npm install native-base --save
(6) Used accordion-collapse-react-native: npm install --save accordion-collapse-react-native

## 檔案說明

- components/element/test.jsx: 即時編輯與測試(目前 import 進 Screen Two，reload 時會顯示)
- components/element/modify/: 完成的 components
- (0618 已移除)components/element/demo/: 用來看已經修改檔案(modify)中的 UI，目前 import 在 Screen Two(目前 import 並顯示在 Screen Two)

- components/webJS_notImport: 方便看 web 程式碼，沒有 import 在 screens

## 其他

- 如果 Reload 慢，建議用 expo+browswer 模擬
- 如果想在 Android 手機模擬，  
   (0)確保手機連到的 wifi 與電腦在同一個區域(連上同一個 wifi，或是電腦開熱點給手機都可)  
   (1)在電腦執行時指令用$expo start --tunnel  
   (2)手機下載 Expo App  
   (3)在電腦的 cmd 訊息出現"Tunnel is ready"後掃描 QRcode)
