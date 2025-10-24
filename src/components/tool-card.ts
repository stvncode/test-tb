import '@awesome.me/webawesome/dist/components/button/button.js';
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('tool-card')
export class ToolCard extends LitElement {
  @property({ type: String }) title = '';
  @property({ type: String }) description = '';
  @property({ type: String }) image = '';
  @property({ type: String }) url = '';
  @property({ type: String }) category = '';

  static styles = css`
    :host {
      display: block;
    }

    .card {
      background: var(--app-bg-card);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 8px var(--app-shadow);
      transition: all 0.3s ease;
      height: 100%;
      display: flex;
      flex-direction: column;
      cursor: pointer;
    }

    .card:hover {
      box-shadow: 0 4px 16px var(--app-shadow-hover);
      transform: translateY(-2px);
    }

    .card-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
      background: #f0f0f0;
    }

    .card-content {
      padding: 20px;
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .card-header {
      margin-bottom: 12px;
    }

    .card-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--app-text-primary);
      margin: 0 0 8px 0;
      line-height: 1.3;
    }

    .card-category {
      display: inline-block;
      background: var(--app-category-bg);
      color: var(--app-category-text);
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 500;
      margin-bottom: 8px;
    }

    .card-description {
      color: var(--app-text-secondary);
      line-height: 1.5;
      margin: 0 0 40px 0;
      flex: 1;
    }

    .card-actions {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: auto;
    }

    .external-icon {
      width: 14px;
      height: 14px;
      margin-left: 6px;
      fill: currentColor;
    }

    @media (max-width: 480px) {
      .card-content {
        padding: 16px;
      }

      .card-actions {
        gap: 6px;
      }

      .card-link {
        padding: 8px 12px;
        font-size: 0.85rem;
      }
    }
  `;

  private _isExternalLink(url: string): boolean {
    return url.startsWith('http') && !url.includes('#');
  }

  private _handleCardClick(event: Event) {
    event.stopPropagation();

    if (this.url && this.url !== '#') {
      const isExternal = this._isExternalLink(this.url);
      if (isExternal) {
        window.open(this.url, '_blank', 'noopener,noreferrer');
        return;
      } else {
        window.location.href = this.url;
      }
    }
  }

  render() {
    return html`
      <div class="card" @click="${(e: Event) => this._handleCardClick(e)}">
        <img src="${this.image}" alt="${this.title}" class="card-image" />

        <div class="card-content">
          <div class="card-header">
            ${this.category
              ? html` <div class="card-category">${this.category}</div> `
              : ''}
            <h3 class="card-title">${this.title}</h3>
          </div>

          <p class="card-description">${this.description}</p>
        </div>
      </div>
    `;
  }
}
