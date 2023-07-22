export default function getTabs(): Promise<browser.tabs.Tab[]> {
    return browser.tabs.query({ currentWindow: true, active: true });
}

export function listTabs(): void {
    const userTabs = getTabs();

    userTabs.then((tabs) => {
        tabs.forEach((tab) => {
            console.log(`Title: ${tab.title}, URL: ${tab.url}`);
        });
    });
}
