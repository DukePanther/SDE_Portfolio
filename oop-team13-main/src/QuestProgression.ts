export default class QuestProgression {
  private miraQuest: string;

  private felixQuest: string;

  private bettyQuest: string;

  private hazelQuest: string;

  private gloriaQuest: string;

  private vaultPin1: number;

  private vaultPin2: number;

  private vaultPin3: number;

  private computerStartScreen: boolean;

  private lives: number;

  private showMails: boolean;

  private gameOpenedFirstTime: boolean;

  private showComputerCrashDialogue: boolean;

  public constructor () {
    this.miraQuest = 'NotBegan';
    this.felixQuest = 'NotBegan';
    this.bettyQuest = 'NotBegan';
    this.hazelQuest = 'NotBegan';
    this.gloriaQuest = 'NotBegan';
    this.vaultPin1 = Math.floor(Math.random() * 9);
    this.vaultPin2 = Math.floor(Math.random() * 9);
    this.computerStartScreen = true;
    this.vaultPin3 = Math.floor(Math.random() * 6) + 3;
    this.lives = 3;
    this.showMails = false;
    this.gameOpenedFirstTime = true;
    this.showComputerCrashDialogue = false;
  }

  /**
   * See 'QuestProgression' script for more information
   * @param characterName 'Mira', 'Felix', 'Betty', 'Hazel'
   * @param completedQuest 'QuestStarted', 'QuestDone', 'QuestClueSeen', 'QuestClueDone'
   */
  public setQuestProgression(characterName: string, completedQuest: string): void {
    if (characterName === 'Mira') {
      this.miraQuest = completedQuest;
    }
    if (characterName === 'Felix') {
      this.felixQuest = completedQuest;
    }
    if (characterName === 'Betty') {
      this.bettyQuest = completedQuest;
    }
    if (characterName === 'Hazel') {
      this.hazelQuest = completedQuest;
    }
    if (characterName === 'Gloria') {
      this.gloriaQuest = completedQuest;
    }
  }

  /**
   * See 'QuestProgression' script for more information
   * @param characterName 'Mira', 'Felix', 'Betty', 'Hazel'
   * @returns 'NotBegan', 'QuestStarted', 'QuestDone', 'QuestClueSeen', 'QuestClueDone'
   */
  public getQuestProgression(characterName: string): string {
    if (characterName === 'Mira') {
      return this.miraQuest;
    }
    if (characterName === 'Felix') {
      return this.felixQuest;
    }
    if (characterName === 'Betty') {
      return this.bettyQuest;
    }
    if (characterName === 'Hazel') {
      return this.hazelQuest;
    }
    if (characterName === 'Gloria') {
      return this.gloriaQuest;
    }

    return null;
  }

  public getVaultPinAnswer(number: number): number {
    if (number === 1) {
      return this.vaultPin1;
    }
    if (number === 2) {
      return this.vaultPin2;
    }
    if (number === 3) {
      return this.vaultPin3;
    }
    return null;
  }

  public setStartScreen(boolean: boolean): void {
    if(boolean === true) {
      this.computerStartScreen = true;
    }
    if (boolean === false) {
      this.computerStartScreen = false;
    }
  }

  public getStartScreen(): boolean {
    return this.computerStartScreen;
  }

  /**
   * reduces the lives
   */
  public reduceLivesOnScreen(): void {
    this.lives -= 1;
  }

  public resetLives(): void {
    this.lives = 3;
  }

  public getLivesOnScreen(): number {
    return this.lives;
  }

  public setMailStatus(boolean: boolean): void {
    if (boolean) {
      this.showMails = true;
    } else if (!boolean) {
      this.showMails = false;
    }
  }

  public getMailStatus(): boolean {
    return this.showMails;
  }

  public setGameOpenedFirstTime(boolean: boolean): void {
    this.gameOpenedFirstTime = boolean;
  }

  public getGameOpenedFirstTime(): boolean {
    return this.gameOpenedFirstTime;
  }

  public setShowComputerCrashDialogue(boolean: boolean): void {
    this.showComputerCrashDialogue = boolean;
  }

  public getShowComputerCrashDialogue(): boolean {
    return this.showComputerCrashDialogue;
  }
}

// ---Questprogression Description---

// -Mira-
// 'NotBegan' -- Quest not jet started.
// 'Quest1Done' -- Europe map done.
// 'Quest2Done' -- Africa map done.
// 'QuestDone' -- Completed quest.
// 'QuestClueSeen' -- Opened email including clue.
// 'QuestClueDone' -- Found clue.

// -Felix-
// 'NotBegan' -- Quest not jet started.
// 'QuestStarted' -- Began quest.
// 'QuestDone' -- Completed quest.
// 'QuestClueSeen' -- Opened email including clue.
// 'QuestClueDone' -- Found clue.

// -Betty-
// 'QuestStarted' -- Began quest.
// 'QuestDone' -- Completed quest.

// -Hazel-
// 'NotBegan' -- Quest not jet started.
// 'QuestStarted' -- Began quest.
// 'QuestDone' -- Completed quest.
// 'QuestClueStarted' -- Quest clue not yet seen.
// 'QuestClueSeen' -- Opened email including clue.
// 'QuestClueDone' -- Found clue.

// -Gloria-
// 'NotBegan' -- Quest not jet started.
// 'QuestDone' -- Completed quest.
