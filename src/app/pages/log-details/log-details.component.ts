import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Log } from '../../_core/models/Log';
import * as mermaid from 'mermaid';
import Chart from 'chart.js/auto';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-log-details',
  standalone: true,
  imports: [MatButton],
  templateUrl: './log-details.component.html',
  styleUrl: './log-details.component.scss',
})
export class LogDetailsComponent implements OnInit {
  @ViewChild('sequenceDiagram') sequenceDiagramElement: ElementRef | undefined;
  exceptionsCountChart: any | null = null;
  log: Log | null = null;

  ngOnInit() {
    this.initializeSequenceDiagram();

    this.createExceptionsCountChart();
    this.fetchExceptionsCount();

    const sampleInput: object = {
      inputProperty1: 'value1',
      inputProperty2: 'value2',
      // Add more properties as needed
    };

    const sampleOutput: object = {
      outputProperty1: 'value1',
      outputProperty2: 'value2',
      // Add more properties as needed
    };

    this.log = {
      Class: 'ExampleClass',
      Method: 'exampleMethod',
      HasException: false,
      EntryTime: new Date(),
      ExitTime: new Date(),
      Input: sampleInput,
      Output: sampleOutput,
      Informations: [
        'Information 1 for list 1',
        'Information 2 for list 1',
        'Information 3 for list 1',
        // Add more information as needed
      ],
      Interactions: [
        {
          Class: 'InteractionClass1',
          Method: 'interactionMethod1',
          HasException: false,
          EntryTime: new Date(),
          ExitTime: new Date(),
          Input: {
            /* Object representing input */
          },
          Output: {
            /* Object representing output */
          },
          Informations: [],
          Interactions: [
            {
              Class: 'ExampleClass',
              Method: 'exampleMethod',
              HasException: false,
              EntryTime: new Date(),
              ExitTime: new Date(),
              Input: sampleInput,
              Output: sampleOutput,
              Informations: [
                'Information 1 for list 2',
                'Information 2 for list 2',
                'Information 3 for list 2',
                // Add more information as needed
              ],
              Interactions: [],
            },
          ],
        },
        {
          Class: 'InteractionClass2',
          Method: 'interactionMethod2',
          HasException: true,
          EntryTime: new Date(),
          ExitTime: new Date(),
          Input: {
            /* Object representing input */
          },
          Output: {
            /* Object representing output */
          },
          Informations: [
            'Information 1 for list 3',
            'Information 2 for list 3',
            'Information 3 for list 3',
            // Add more information as needed
          ],
          Interactions: [],
        },
        // Add more interaction logs as needed
      ],
    };

    const interaction1Input: object = {
      interaction1InputProperty1: 'value1',
      interaction1InputProperty2: 'value2',
      // Add more properties as needed
    };

    const interaction1Output: object = {
      interaction1OutputProperty1: 'value1',
      interaction1OutputProperty2: 'value2',
      // Add more properties as needed
    };

    const interaction2Input: object = {
      interaction2InputProperty1: 'value1',
      interaction2InputProperty2: 'value2',
      // Add more properties as needed
    };

    const interaction2Output: object = {
      interaction2OutputProperty1: 'value1',
      interaction2OutputProperty2: 'value2',
      // Add more properties as needed
    };

    // Update interactions with sample input and output objects
    this.log.Interactions[0].Input = interaction1Input;
    this.log.Interactions[0].Output = interaction1Output;
    this.log.Interactions[1].Input = interaction2Input;
    this.log.Interactions[1].Output = interaction2Output;
  }

  async initializeSequenceDiagram(): Promise<void> {
    const graphDefinition = `sequenceDiagram
    Alice->>John: Hello John, how are you?
    John-->>Alice: Great!
    Alice-)John: See you later!`;

    const { svg } = await mermaid.default.render(
      'sequenceDiagram',
      graphDefinition
    );

    const element: Element = this.sequenceDiagramElement?.nativeElement;
    element.innerHTML = svg;
  }
  createExceptionsCountChart() {
    this.exceptionsCountChart = new Chart('exceptionsCountChart', {
      type: 'doughnut',
      data: {
        labels: [],
        datasets: [],
      },
      options: {
        plugins: {
          title: {
            text: 'Methods Exception Count',
            display: true,
            font: {
              size: 14,
              style: 'oblique',
            },
            align: 'start',
          },
        },
      },
    });
  }

  fetchExceptionsCount() {
    this.exceptionsCountChart?.data.datasets.splice(
      0,
      this.exceptionsCountChart?.data.datasets.length
    );
    this.exceptionsCountChart?.data.labels?.splice(
      0,
      this.exceptionsCountChart?.data.labels?.length
    );

    this.exceptionsCountChart?.data.labels?.push(
      ...this.exceptionsCount.map((x) => x.method)
    );

    this.exceptionsCountChart?.data.datasets.push({
      data: this.exceptionsCount.map((x) => x.value),
    });

    this.exceptionsCountChart?.update();
  }

  controllerList: string[] = [
    'UserController',
    'ProductController',
    'OrderController',
    'PaymentController',
    'CartController',
  ];

  endpointList: string[] = ['user', 'product', 'order', 'payment', 'cart'];

  exceptionsCount = [
    {
      method: 'CalculateMedian',
      value: 15,
    },
    {
      method: 'ComputeFactorial',
      value: 10,
    },
    {
      method: 'GeneratePrimeNumbers',
      value: 75,
    },
    {
      method: 'FindRoot',
      value: 35,
    },
    {
      method: 'CalculateExponential',
      value: 50,
    },
    {
      method: 'FindLargestPalindrome',
      value: 20,
    },
    {
      method: 'CalculateStandardDeviation',
      value: 12,
    },
  ];
}
